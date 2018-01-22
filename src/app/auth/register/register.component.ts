import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    lat: '',
    lng: ''
  }

  constructor( private auth: AuthService, 
               private router: Router) { }

  ngOnInit() {
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

}
