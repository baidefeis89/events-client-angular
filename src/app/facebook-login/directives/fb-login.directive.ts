import { LoadFbApiService } from '../services/load-fb-api.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgZone } from '@angular/core';

@Directive({
  selector: '[aeFbLogin]'
})
export class FbLoginDirective {
  @Output() loginOk: EventEmitter<FB.LoginStatusResponse> = new EventEmitter<any>();
  @Output() loginError: EventEmitter<String> = new EventEmitter<String>();
  @Output() loadingEnd: EventEmitter<void> = new EventEmitter<void>();
  @Input() scopes: string[];

  constructor(private el: ElementRef, private loadService: LoadFbApiService, private ngZone: NgZone) {
    loadService.loadApi().subscribe(
      () => this.loadingEnd.emit()
    );
  }

  @HostListener ('click') onClick() {
    this.loadService.login(this.scopes.join(',')).subscribe(
      resp => this.ngZone.run( () => this.loginOk.emit(resp)),
      error => this.ngZone.run( () => this.loginError.emit('Error with Facebook login!'))
    );
  }

}
