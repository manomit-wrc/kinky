declare const Pusher: any;
import { Injectable } from '@angular/core';
import { keyDetails } from '../../keys/keys.prod';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;
  apiUri = environment.apiUri;

  constructor(private http: HttpClient) {
    this.pusher = new Pusher(keyDetails.pusher.key, {
      cluster: keyDetails.pusher.cluster,
      encrypted: true
    });

    this.channel = this.pusher.subscribe('events-channel');
  }

  checkLoggedin(user_id) {
    this.http.post(`${this.apiUri}/check-loggedin`, { user_id })
      .subscribe(data => {
        console.log(data);
      });
  }
}
