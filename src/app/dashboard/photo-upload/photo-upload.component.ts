import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, noop, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { log } from 'util';
import * as S3 from 'aws-sdk/clients/s3';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login } from '../../auth/auth.actions';
import { profileImages } from '../../auth/auth.selectors';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
declare var $: any;


@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  public _success : BehaviorSubject<number> = new BehaviorSubject(0);
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  _imageData = this._success.asObservable();
  selectedFiles: FileList;
  fileArr = [];
  IMG_FOLDER = 'images/';
  percentage: any;
  loading: boolean = false;
  publicImages = [];
  privateImages = [];
  imageData = [];
  display='none';

  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };
	
  // gallery images
  images: GALLERY_IMAGE[] = [
    {
      url: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=1260", 
      altText: 'woman-in-black-blazer-holding-blue-cup', 
      title: 'woman-in-black-blazer-holding-blue-cup',
      thumbnailUrl: "https://images.pexels.com/photos/669013/pexels-photo-669013.jpeg?w=60"
    },
    {
      url: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=1260", 
      altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain', 
      extUrl: 'https://www.pexels.com/photo/two-woman-standing-on-the-ground-and-staring-at-the-mountain-669006/',
      thumbnailUrl: "https://images.pexels.com/photos/669006/pexels-photo-669006.jpeg?w=60"
    },
  ];




  constructor(private sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
    private renderer: Renderer
  ) { }

BarWidth = 0;

  ngOnInit() {

    

    this.display='block';
    this.store.pipe(
      select(profileImages),
      tap(images => {
        this.fileArr = images;
        this.publicImages = this.fileArr.filter(f => f.access === 'Public');
        this.privateImages = this.fileArr.filter(f => f.access === 'Private');

        //$("#owl-demo").data('owlCarousel').reinit();
        
      })
    ).subscribe(noop);



    this._imageData.subscribe((percentage) => this.BarWidth = percentage);

    $(document).ready(function() {
      
      var owl = $("#owl-demo");
      owl.owlCarousel({
        navigation : true,
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem : true,
        afterMove: function(elem) {

        }
      });
      
    });

  }

  async changeListener(fileType: any)  {

    this.percentage = 10;
    this._success.next(this.percentage);
    this.loading = true;
    for(let i = 0; i < fileType.target.files.length; i++) {
      const file = fileType.target.files[i];

      this.fileArr.push({
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
        altTag: '',
        access: 'Public'
      });
      
      await this.uploadImage(file);
      
    }
    this.display='block';
    this.auth.uploadProfileImage(this.imageData)
      .pipe(tap(
        data => {
          
          const info = data.info
          this.store.dispatch(new Login({ info }));
          window.location.reload();

        }
      )).subscribe(noop);

  }

  uploadImage(file) {
   
    return new Promise(resolve => {
      const params = {
        Bucket: 'kinky-wrc',
        Key: this.IMG_FOLDER + file.name,
        Body: file,
        ACL: 'public-read'
      };
      const bucket = new S3(
        {
          accessKeyId: 'AKIAI7FM27MZKQR6LXQQ',
          secretAccessKey: '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',
          region: 'us-east-1'
        }
      );


      this.percentage = 10;
      this._success.next(this.percentage);

      bucket.upload(params).on("httpUploadProgress", evt => {

        this.percentage = (evt.loaded * 100) / evt.total;
        this._success.next(parseInt(this.percentage));

      }).send((err, data) => {


        if (err) {
          console.log('There was an error uploading your file: ', err);

        }

        this.imageData.push({
          url: data.Location,
          altTag: data.key,
          access: 'Public'
        })

        
        resolve();
        });

    })
  }

  deleteImage(image) {
    this.auth.deleteImage(image)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
        })
      ).subscribe(noop);
  }

  onMouseEnter(event) {
    var target = event.currentTarget;
    if(target.querySelector('.photo-edit-outer').className.indexOf("photo-popshow") === -1) {
      this.renderer.setElementClass(target.querySelector('.photo-edit-outer'), "photo-popshow", true);

    }

  }

  onMouseLeave(event) {
    var target = event.currentTarget;
    target.querySelector('.photo-edit-outer').classList.remove("photo-popshow");
  }
  onAnchorClick(event) {
    var target = event.currentTarget;
    if(target.parentElement.className.indexOf("photo-edit-icon-active") === -1) {
      this.renderer.setElementClass(target.parentElement, "photo-edit-icon-active", true);
      target.parentElement.nextSibling.style.display = "block";
    }
    else {
      target.parentElement.classList.remove("photo-edit-icon-active");
      target.parentElement.nextSibling.style.display = "none";
    }

  }

  openGallery(index: number = 0) {
    
    this.ngxImageGallery.open(index);
  }
	
  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }
	
  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }
	
  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next()
    //this.ngxImageGallery.next(index);
  }
	
  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
    //this.ngxImageGallery.prev(index);
  }
	
  /**************************************************/
	
  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }
  
  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button

  moveToPrivate(imgUrl, access) {
    access = access === 'Private' ? 'Public' : 'Private';
    this.auth.moveToPrivate(imgUrl, access)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          window.location.reload();
          
        })
      ).subscribe(noop)
  }

  setAsProfile(imgUrl) {
    this.auth.setAsProfile(imgUrl)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          window.location.reload();
        })
      ).subscribe(noop);
  }
  

}
