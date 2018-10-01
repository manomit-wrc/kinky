import { Component, OnInit, Renderer, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services';
import {  tap } from 'rxjs/operators';
import { noop, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login } from '../../auth/auth.actions';
import { profileImages } from '../../auth/auth.selectors';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PhotoUploadComponent implements OnInit {
  public _success : BehaviorSubject<number> = new BehaviorSubject(0);

  _imageData = this._success.asObservable();
  selectedFiles: FileList;
  fileArr = [];
  percentage: any;
  loading: boolean = false;
  publicImages = [];
  privateImages = [];
  tempImages = [];
  imageData = [];
  display='none';
  image: any;
  selectedIndex: number;
  transform: number;
  showSlider: boolean = false;
  btnValue: string = '';
  altTag = '';
  apiUri = environment.apiUri;
  BarWidth: number;
  lengthCount: number = 0;


  constructor(private sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private store: Store<AppState>,
    private renderer: Renderer,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }



  ngOnInit() {

    this.BarWidth = 0;

    this.selectedIndex = 0;
    this.transform = 0;

    this.display='block';
    this.store.pipe(
      select(profileImages),
      tap(images => {
        this.fileArr = images;
        this.publicImages = this.fileArr.filter(f => f.access === 'Public');
        this.privateImages = this.fileArr.filter(f => f.access === 'Private');

      })
    ).subscribe(noop);



    this._imageData.subscribe((percentage) => this.BarWidth = percentage);


  }

  changeListener(fileType: any)  {
    const fd = new FormData();
    
    for(let i = 0; i < fileType.target.files.length; i++) {

      
      
      const file = fileType.target.files[i];
      if((file.size / 1000) <= 5000) {
        fd.append('images', file);
        this.fileArr.push({
          url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
          altTag: '',
          access: 'Private'
        });
      }
      else {
        this.lengthCount++;
        this.toastr.error(`${file.name} is more than 5 MB`)
      }
      
    }

    if(this.lengthCount !== fileType.target.files.length) {
      this.loading = true;
    this.percentage = 5;
    this._success.next(this.percentage);


    this.http.post(`${this.apiUri}/upload-profile-image`, fd, {
      reportProgress: true, observe: 'events'
    }).subscribe(( event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          const info = event.body.info;
          this.store.dispatch(new Login({ info }));
          this.toastr.success("Images are uploaded successfully");
          this._success.next(100);
          setTimeout(() => {
            this.percentage = 0;
            this.loading = false;
          }, 2000)
          
        }
        switch(event.type) {
          case HttpEventType.Sent:
            this.percentage = 10;
            this._success.next(this.percentage);
            
            break;
          case 1:
            
            this.percentage = Math.round(this.percentage) !== Math.round(event['loaded'] / event['total'] * 100);
            this._success.next(parseInt(this.percentage));
            if (Math.round(this.percentage) !== Math.round(event['loaded'] / event['total'] * 100)){
              this.percentage = event['loaded'] / event['total'] * 100;
              //this.slimLoadingBarService.progress = Math.round(this.percentage);
              //console.log(this.percentage);
              this._success.next(parseInt(this.percentage) - 2);
            }
            break;
          case 2:
            this._success.next(99);
            break;
        }
    });
    }

    

  }


  deleteImage(image) {
    this.auth.deleteImage(image)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          //window.location.href = "/my-photo-upload";
          this.toastr.success("Image deleted permenantly");
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
          //window.location.reload();
          this.toastr.success(`This image is now ${access}`);

        })
      ).subscribe(noop)
  }

  setAsProfile(imgUrl) {

    let img = new Image();
    img.src = imgUrl;

    if(img.naturalHeight <= 170 && img.naturalWidth <= 170) {
      this.auth.setAsProfile(imgUrl)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          this.toastr.success("Image set as profile pic");
        })
      ).subscribe(noop);
    }
    else {
      this.toastr.error(`For profile pic, maximum image dimension will be 170x170`)
    }

  }

  setPublicImage(image, index) {
    this.btnValue = 'Private';
    this.showSlider = true;
    this.image = image;
    this.selectedIndex = index;
    this.tempImages = this.publicImages;
    this.altTag = image.altTag;

  }

  setPrivateImage(image, index) {
    this.btnValue = 'Public';
    this.showSlider = true;
    this.image = image;
    this.selectedIndex = index;
    this.tempImages = this.privateImages;
    this.altTag = image.altTag;
  }
  onPrev() {
    this.selectedIndex = this.selectedIndex - 1;
    if(this.selectedIndex < 0) {
      this.selectedIndex = this.tempImages.length - 1;
    }

    const data = this.tempImages[this.selectedIndex];
    this.image = data;
    this.altTag = this.image.altTag;
  }

  onNext() {
    this.selectedIndex = this.selectedIndex + 1;
    if(this.selectedIndex > this.tempImages.length - 1) {
      this.selectedIndex = 0;
    }

    const data = this.tempImages[this.selectedIndex];
    this.image = data;
    this.altTag = this.image.altTag;
  }

  toggleClass(event) {
    var target = event.currentTarget;

    if(target.className.indexOf("save-btn") === -1) {
      this.renderer.setElementClass(target, "save-btn", true);
    }
    else {
      target.classList.remove("save-btn");
    }
  }

  changeImageAccess(event) {
    var target = event.currentTarget;
    if(target.previousSibling.className.indexOf("save-btn") === -1) {
      this.btnValue = this.image.access
    }


    this.auth.changeImageDetails(this.image.url, this.btnValue, this.altTag)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          this.toastr.success("Image details is changed successfully");

        })
      ).subscribe(noop)
  }

  closeSlider() {
    this.showSlider = false;
  }



}
