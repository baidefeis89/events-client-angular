import { Component, OnInit, Input, Output, EventEmitter, Inject, NgZone, ElementRef } from '@angular/core';
import { PAYPAL_CONFIG, PaypalConfig } from '../paypal-button.config';
import { PaypalLoadService } from '../services/paypal-load.service';
declare var paypal: any;

@Component({
  selector: 'ae-paypal-button',
  template: ``,
  styles: []
})
export class PaypalButtonComponent implements OnInit {
  @Input() amount: number;
  @Output() paymentCompleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Inject(PAYPAL_CONFIG) private config: PaypalConfig,
              private ngZone: NgZone, private paypalService: PaypalLoadService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.paypalService.loadPaypal().subscribe( () => this.render());
  }

  private render() {
    paypal.Button.render(
      {
        env: this.config.environment,
        client: {
          sandbox: this.config.sandbox,
          production: this.config.production
        },
        payment: (data, actions) => {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: this.amount,
                  currency: 'EUR'
                }
              }
            ]
          });
        },
        commit: true,
        onAuthorize: (data, actions) => {
          return actions.payment.execute().then( response => {
            this.paymentCompleted.emit(true);
          });
        },
        onCancel: data => {
          this.paymentCompleted.emit(false);
        }
      },
      '#' + this.elementRef.nativeElement.id
    );
  }

}
