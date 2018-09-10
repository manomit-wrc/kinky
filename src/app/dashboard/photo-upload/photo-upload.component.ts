import { Component, OnInit, Renderer } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, noop } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { log } from 'util';
@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  fileArr = [];
  constructor(private sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private router: Router,
  ) { }
image = [];
  ngOnInit() {
  }

  changeListener(fileType: any)  {
    for (let i = 0; i < fileType.target.files.length; i++) {
      this.fileArr.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileType.target.files[i])));

      this.auth.image_upload(this.fileArr)
      .pipe(first())
      .subscribe(data => {


      });
    }
  }




}
