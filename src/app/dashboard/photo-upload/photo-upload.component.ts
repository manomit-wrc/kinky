import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { log } from 'util';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  fileArr = [];
  constructor(private sanitizer: DomSanitizer) { }
image = [];
  ngOnInit() {
  }

  changeListener(fileType: any)  {
    for (let i = 0; i < fileType.target.files.length; i++) {
      this.fileArr.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileType.target.files[i])));
    }
  }




}
