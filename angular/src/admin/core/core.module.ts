import { AgmCoreModule } from '@agm/core';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
  MatIconRegistry,
  MatSnackBarConfig
} from '@angular/material';
import { environment } from '../../environments/environment'; 
import { LayoutModule } from './layout/layout.module';
import { PendingInterceptorModule } from '@shared/app-shared/loading-indicator/pending-interceptor.module';

@NgModule({
  imports: [
    // Displays Loading Bar when a Route Request or HTTP Request is pending
    PendingInterceptorModule,

    // Google Maps Module
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),

    // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    LayoutModule
  ],
  providers: [
    MatIconRegistry,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      } as MatFormFieldDefaultOptions
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      } as MatSnackBarConfig
    }
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
