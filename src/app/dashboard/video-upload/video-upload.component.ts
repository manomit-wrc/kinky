import { UploadService } from '../../services/upload.service';
import { Component, OnInit, Renderer, ViewEncapsulation } from '@angular/core';
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
import { profileVideos } from '../../auth/auth.selectors';
import { keyDetails } from '../../../keys/keys.prod';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {
  videos = [];
  BarWidth = 0;
  video_url:any;
  video_id:any;
  access:any;
  loading: boolean = false;
  public _success : BehaviorSubject<number> = new BehaviorSubject(0);
  _videoData = this._success.asObservable();
  selectedFiles: FileList;
  fileArr = [];
  VIDEO_FOLDER = 'videos/';
  userFilter = {access : ''};
  percentage: any;
  video_tag:any;
  btnValue: string = '';
  setAccess:boolean = false;
  showSlider:boolean = false;
  selectedIndex: number;
  tempVideos:any=[];
  publicVideos:any=[];
  privateVideos:any=[];
  video:any;
  videoCount: number = 0;
  videoData = [];
  display='none';
  constructor(private sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private _upload: UploadService,
    private router: Router,
    private store: Store<AppState>,
    private toastr: ToastrService,
  private renderer: Renderer) {}

  ngOnInit() {

    this.selectedIndex = 0;
    this.display='block';
    this.store.pipe(
      select(profileVideos),
      tap(videos => {
        this.videoCount = videos.length;
        this.fileArr = videos;
        this.publicVideos = this.fileArr.filter(f => f.access === 'Public');
        this.privateVideos = this.fileArr.filter(f => f.access === 'Private');
      })
    ).subscribe(noop);

    this._videoData.subscribe((percentage) => this.BarWidth = percentage);
  }

  async changeListener(fileType: any)  {

    if(this.videoCount + fileType.target.files.length > 5) {
      this.toastr.error("No of videos should be 5");
      return;
    }
    this.percentage = 10;
    this._success.next(this.percentage);
    this.loading = true;
    for(let i = 0; i < fileType.target.files.length; i++) {
      const file = fileType.target.files[i];
      if((file.size / 1000) <= 5000) {

        this.fileArr.push({
          url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
          altTag: '',
          access: 'Public'
        });

        await this.uploadVideo(file);
      }
      else {
        this.toastr.error("Video size is more than 120 MB")
      }


    }

    this.display='block';
    this.auth.uploadProfileVideo(this.videoData)
      .pipe(tap(
        data => {

          const info = data.info
          this.store.dispatch(new Login({ info }));
          this.toastr.success("Videos are uploaded successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          //window.location.reload();
        }
      )).subscribe(noop);
  }

  uploadVideo(file) {
    return new Promise(resolve => {
      const params = {
        Bucket: 'kinky-wrc',
        Key: this.VIDEO_FOLDER + file.name,
        Body: file,
        ACL: 'public-read'
      };
      const bucket = new S3(
        {
          accessKeyId: keyDetails.ACCESS_KEY,
          secretAccessKey: keyDetails.SECRET_KEY,
          region: 'us-east-1'
        }
      );



      this._success.next(this.percentage);

      bucket.upload(params).on("httpUploadProgress", evt => {

        this.percentage = (evt.loaded * 100) / evt.total;
        this._success.next(parseInt(this.percentage));

      }).send((err, data) => {


        if (err) {
          console.log('There was an error uploading your file: ', err);

        }

        this.videoData.push({
          url: data.Location,
          altTag: '',
          access: 'Private'
        })


        resolve();
        });

    })
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
  setPublicVideo(video, index) {
    this.btnValue = 'Private';
    this.video_url = video.url;
    this.showSlider = true;
    this.selectedIndex = index;
    this.video_tag = video.altTag;
    this.tempVideos = this.publicVideos;
    this.video = video;

  }

  setPrivateVideo(video, index) {
    this.btnValue = 'Public';
    this.video_url = video.url;
    this.showSlider = true;
    this.selectedIndex = index;
    this.video_tag = video.altTag;
    this.tempVideos = this.privateVideos;
    this.video = video;
  }
/*   delete(id) {

    if(id!=undefined){
      this._upload.deletevideo(id)
      .pipe(first())
      .subscribe(data => {
        const info = data.info;
        this.store.dispatch(new Login({ info }));
        window.location.reload();

      });

    }else{
      alert("please select an video");
    }


  } */
  onMouseEnter(event) {
    var target = event.currentTarget;
    if(target.querySelector('.photo-edit-outer').className.indexOf("photo-popshow") === -1) {
      this.renderer.setElementClass(target.querySelector('.photo-edit-outer'), "photo-popshow", true);

    }

  }

  deleteVideo(video) {
    this._upload.deleteVideo(video)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          //window.location.href = "/my-photo-upload";
          this.toastr.success("Video deleted permenantly");
        })
      ).subscribe(noop);
  }

  moveToPrivate(imgUrl, access) {
    access = access === 'Private' ? 'Public' : 'Private';
    this._upload.videosetprivate(imgUrl, access)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          //window.location.reload();
          this.toastr.success(`This video is now ${access}`);

        })
      ).subscribe(noop)
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

  onMouseLeave(event) {
    var target = event.currentTarget;
    target.querySelector('.photo-edit-outer').classList.remove("photo-popshow");
  }
  onPrev() {
    this.selectedIndex = this.selectedIndex - 1;
    if(this.selectedIndex < 0) {
      this.selectedIndex = this.tempVideos.length - 1;
    }

    const data = this.tempVideos[this.selectedIndex];
    this.video_url = data.url;
    this.video_tag = data.altTag;
    this.video = data;
  }

  onNext() {
     this.selectedIndex = this.selectedIndex + 1;
    if(this.selectedIndex > this.tempVideos.length - 1) {
      this.selectedIndex = 0;
    }

    const data = this.tempVideos[this.selectedIndex];
    this.video_url = data.url;
    this.video_tag = data.altTag;
    this.video = data;
  }

  closeSlider() {
    this.showSlider = false;
  }


  update_video(event){
    var target = event.currentTarget;
    if(target.previousSibling.className.indexOf("save-btn") === -1) {
      this.btnValue = this.video.access;
    }


    this._upload.update_video(this.video_url, this.btnValue, this.video_tag)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          this.toastr.success("Video details is changed successfully");

        })
      ).subscribe(noop)


  }

}
