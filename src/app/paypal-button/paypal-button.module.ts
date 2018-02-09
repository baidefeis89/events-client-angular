import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaypalButtonComponent } from './component/paypal-button.component';
import { PaypalLoadService } from './services/paypal-load.service';
import { PaypalConfig, PAYPAL_CONFIG } from './paypal-button.config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaypalButtonComponent],
  exports: [PaypalButtonComponent],
  providers: []
})
export class PaypalButtonModule { 
  static forRoot(paypal_config: PaypalConfig): ModuleWithProviders {
    return {
      ngModule: PaypalButtonModule,
      providers: [
        PaypalLoadService,
        { provide: PAYPAL_CONFIG, useValue: paypal_config }
      ]
    };
  }
}
