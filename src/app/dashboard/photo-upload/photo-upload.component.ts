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
  

  constructor(private sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
  ) { }
images = [];
BarWidth = 0;

  ngOnInit() {

    this.store.pipe(
      select(profileImages),
      tap(images => {
        this.fileArr = images;
      })
    ).subscribe(noop);

    this._imageData.subscribe((percentage) => this.BarWidth = percentage);
    
  }

  changeListener(fileType: any)  {
    
    for(let i = 0; i < fileType.target.files.length; i++) {
      const file = fileType.target.files[i];

      this.fileArr.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)));
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

        this.auth.uploadProfileImage(data.Location, data.key)
          .pipe(tap(
            data => {
              console.log(data);
              const info = data.info
              this.store.dispatch(new Login({ info }))
            }
          )).subscribe(noop);
        
        });
    }
      
  }


  
}
