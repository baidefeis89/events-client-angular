import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'ae-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  error: boolean = false;
  errorMessage:string = '';
  position: {
    lat: number,
    lng: number
  }

  constructor(private auth: AuthService,
              private router: Router, private geolocation: GeolocationService) { }

  ngOnInit() {
    this.geolocation.getLocation().subscribe( res => {
      this.position = {
        lat: res.lat,
        lng: res.lng
      }
    });
  }

  login() {
    this.auth.login(this.email, this.password, this.position).subscribe( value => {
      if (value) this.router.navigate(['/events']);
      else this.error = true;
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
      this.errorMessage = error;
    });
  }

}
