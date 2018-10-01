import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment'
import { AppState } from '../reducers';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  apiUri = environment.apiUri;
  IMG_FOLDER = 'images/';
  percentage: number;

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) { }

  uploadfile(file) {

    const bucket = new S3(
      {
        accessKeyId: 'AKIAI7FM27MZKQR6LXQQ',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );

    const params = {
      Bucket: 'kinky-wrc',
      Key: this.IMG_FOLDER + file.name,
      Body: file
    };
    bucket.upload(params).on("httpUploadProgress", function(evt) {
      this.percentage = (evt.loaded * 100) / evt.total;
      return this.percentage;
    }).send(function(err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
      });

  }
 
  
  



}

