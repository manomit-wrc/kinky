import { Component, OnInit, Renderer, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../../services';
import { tap } from 'rxjs/operators';
import { noop, BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login } from '../../auth/auth.actions';
import { profileVideos } from '../../auth/auth.selectors';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { postMasters } from '../dashboard.actions';
@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoUploadComponent implements OnInit {

  public _success : BehaviorSubject<number> = new BehaviorSubject(0);
  _videoData = this._success.asObservable();
  selectedFiles: FileList;
  fileArr = [];
  percentage: any;
  loading: boolean = false;
  publicVideos = [];
  privateVideos = [];
  tempVideos = [];
  imageData = [];
  display='none';
  video: any;
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
    private http: HttpClient) {}

  ngOnInit() {

    this.BarWidth = 0;

    this.selectedIndex = 0;
    this.transform = 0;

    this.display='block';
    this.store.pipe(
      select(profileVideos),
      tap(videos => {
        this.fileArr = videos;
        this.publicVideos = this.fileArr.filter(f => f.access === 'Public');
        this.privateVideos = this.fileArr.filter(f => f.access === 'Private');

      })
    ).subscribe(noop);



    this._videoData.subscribe((percentage) => this.BarWidth = percentage);
  }

  changeListener(fileType: any)  {


    const fd = new FormData();

    for(let i = 0; i < fileType.target.files.length; i++) {



      const file = fileType.target.files[i];
      if((file.size / 1000) <= 5000) {
        fd.append('videos', file);
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


    this.http.post(`${this.apiUri}/upload-profile-video`, fd, {
      reportProgress: true, observe: 'events'
    }).subscribe(( event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          const info = event.body.info;
          this.store.dispatch(new Login({ info }));
          this.toastr.success("Videos are uploaded successfully");
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

    console.log(video);
    this.btnValue = 'Private';
    this.showSlider = true;
    this.video = video;
    this.selectedIndex = index;
    this.tempVideos = this.publicVideos;
    this.altTag = video.altTag;

  }

  setPrivateVideo(video, index) {

    this.btnValue = 'Public';
    this.showSlider = true;
    this.video = video;
    this.selectedIndex = index;
    this.tempVideos = this.privateVideos;
    this.altTag = video.altTag;
  }

  onMouseEnter(event) {
    var target = event.currentTarget;
    if(target.querySelector('.photo-edit-outer').className.indexOf("photo-popshow") === -1) {
      this.renderer.setElementClass(target.querySelector('.photo-edit-outer'), "photo-popshow", true);

    }

  }

  deleteVideo(video) {
    this.auth.deleteVideo(video)
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
    this.auth.videosetprivate(imgUrl, access)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          //window.location.reload();
          this.toastr.success(`This video is now ${access}`);

          this.auth.post('',imgUrl,'','','video')
          .subscribe(datas => {

            if(datas.code === 200) {
              this.auth.post_list()
              .subscribe(datas1 => {
                const posts = datas1.info;
                this.store.dispatch(new postMasters({ posts }));
              });
            }
          });

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
    this.video = data;
    this.altTag = this.video.altTag;
  }

  onNext() {
    this.selectedIndex = this.selectedIndex + 1;
    if(this.selectedIndex > this.tempVideos.length - 1) {
      this.selectedIndex = 0;
    }

    const data = this.tempVideos[this.selectedIndex];
    this.video = data;
    this.altTag = this.video.altTag;
  }

  closeSlider() {
    this.showSlider = false;
  }


  update_video(event){
    var target = event.currentTarget;
    if(target.previousSibling.className.indexOf("save-btn") === -1) {
      this.btnValue = this.video.access;
    }


    this.auth.update_video(this.video.url, this.btnValue, this.altTag)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info }));
          this.toastr.success("Video details is changed successfully");

        })
      ).subscribe(noop)

  }

}
