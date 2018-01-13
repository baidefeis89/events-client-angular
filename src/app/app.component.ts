import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'ae-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ae';
  showNavbar: boolean = false;

  constructor (private auth: AuthService) {

  }

  ngOnInit(): void {
    this.auth.$loginEmitter.subscribe( isLogged => {
      if (isLogged) this.showNavbar = true;
      else this.showNavbar = false;
    });
    this.auth.isLogged().subscribe( 
      isLogged => this.showNavbar = isLogged);
  }

}
