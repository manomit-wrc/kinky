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



@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  public _success : BehaviorSubject<number> = new BehaviorSubject(0);
  
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
  image: string = '';
  selectedIndex: number;
  transform: number;




  constructor(private sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
    private renderer: Renderer
  ) { }

BarWidth = 0;

  ngOnInit() {

    this.selectedIndex = 0;
    this.transform = 100;

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
          window.location.href = "/my-photo-upload";
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

  setPublicImage(image, index) {
    console.log(image);
    this.image = image;
    // this.transform =  100 - (index) * 50;
    // this.selectedIndex = index;
    // this.selectedIndex = this.selectedIndex + 1;

    // if(this.selectedIndex > 4) {
    //   this.selectedIndex = 0;
    // }

  }
  

}
