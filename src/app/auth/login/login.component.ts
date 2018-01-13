import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'ae-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  error: boolean = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.email, this.password).subscribe( value => {
      if (value) this.router.navigate(['/events']);
      else this.error = true;
    });
  }

}
