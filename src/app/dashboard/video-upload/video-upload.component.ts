import { UploadService } from '../../services/upload.service';
import { Component, OnInit, Renderer } from '@angular/core';
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
  setAccess:boolean = false;
  constructor(private sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private _upload: UploadService,
    private router: Router,
    private store: Store<AppState>) {}

  ngOnInit() {


    this.store.pipe(
      select(profileVideos),
      tap(videos => {
        console.log(videos);
        this.fileArr = videos;
      })
    ).subscribe(noop);

    this._videoData.subscribe((percentage) => this.BarWidth = percentage);
  }

  changeListener(fileType: any)  {
    this.loading = true;
    for(let i = 0; i < fileType.target.files.length; i++) {
      const file = fileType.target.files[i];

      this.fileArr.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)));
      const params = {
        Bucket: 'kinky-wrc',
        Key: this.VIDEO_FOLDER + file.name,
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

        this.auth.uploadProfileVideo(data.Location, data.key)
          .pipe(tap(
            data => {
              console.log(data);
              const info = data.info;
              this.store.dispatch(new Login({ info }))
             // window.location.reload();
            }
          )).subscribe(noop);

        });
    }

  }

  video_select(url,id) {
    this.video_url = url;
    this.video_id = id;
  }

  setToPrivate(id) {
    this._upload.videosetprivate(id)
    .pipe(first())
    .subscribe(data => {
      const info = data.info;
      this.store.dispatch(new Login({ info }));
      window.location.reload();

    });
  }

  setprivate() {
    this.setAccess = !this.setAccess;
  }

  delete(id) {

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


  }

  update_video(url){

   if (this.video_tag != undefined && url!=undefined) {
    if(this.setAccess == true){
      this.access ='private';
    }else{
      this.access ='public';
    }

      this._upload.update_video(this.video_tag,url,this.access)
    .pipe(first())
    .subscribe(data => {
      const info = data.info;
      this.store.dispatch(new Login({ info }));
      window.location.reload();

    });

   } else {
    alert('Please select an video and also type a name of the video');
   }
  }

}
