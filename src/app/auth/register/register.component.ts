import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'ae-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: string = null;
  user = {
    name: '',
    email: '',
    email2: '',
    password: '',
    avatar: '',
    lat: null,
    lng: null
  };

  constructor( private auth: AuthService, 
               private router: Router, private geolocation: GeolocationService) { }

  ngOnInit() {
    this.geolocation.getLocation().subscribe( res => {
      this.user.lat = res.lat;
      this.user.lng = res.lng;
    });
  }

  register() {
    this.auth.register(this.user).subscribe( response => {
      if (response) this.router.navigate(['/events']);
    }, error => {
      this.error = error;
    });
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0 ) return;
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.user.avatar = reader.result;
    });
  }

  loggedGoogle(user: gapi.auth2.GoogleUser) {
    let token = user.getAuthResponse(true).access_token;

    this.auth.loggedGoogle(token).subscribe( response => {
      if (response) this.router.navigate(['/events']);
    }, error => {
      this.error = error;
    });
  }

  loggedFacebook(resp: FB.LoginStatusResponse) {
    let token = resp.authResponse.accessToken;

    this.auth.loggedFacebook(token).subscribe( response => {
      if (response) this.router.navigate(['/events']);
    }, error => {
      this.error = error;
    });
  }

  showError(error) {
    this.error = error;
  }
}
