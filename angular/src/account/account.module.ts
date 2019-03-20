import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JsonpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import { ModalModule } from "ngx-bootstrap";

import { AbpModule } from "@abp/abp.module";

import { AccountRoutingModule } from "./account-routing.module";

import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";

import { SharedModule } from "@shared/shared.module";

import { AccountComponent } from "./account.component";
import { TenantChangeComponent } from "./tenant/tenant-change.component";
import { TenantChangeModalComponent } from "./tenant/tenant-change-modal.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AccountLanguagesComponent } from "./layout/account-languages.component";

import { LoginService } from "./login/login.service";
import { MaterialModule } from "@shared/app-shared/material-components.module";
import { LoadingIndicatorModule } from "@shared/app-shared/loading-indicator/loading-indicator.module";
import { PendingInterceptorService } from "@shared/app-shared/loading-indicator/pending-interceptor.service";
import { ResetPasswordComponent } from "./reset-passwprd/reset-passwprd.component";
import { ForgetPasswordComponent } from "./forget-passwprd/forget-passwprd.component";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
    AbpModule,
    SharedModule,
    ServiceProxyModule,
    AccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    LoadingIndicatorModule,
    NgxSpinnerModule
  ],
  declarations: [
    AccountComponent,
    TenantChangeComponent,
    TenantChangeModalComponent,
    LoginComponent,
    RegisterComponent,
    AccountLanguagesComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent
  ],
  providers: [LoginService, PendingInterceptorService]
})
export class AccountModule {}
