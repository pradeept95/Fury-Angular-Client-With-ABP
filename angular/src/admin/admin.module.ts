import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { JsonpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import { ModalModule } from "ngx-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";

import { AbpModule } from "@abp/abp.module";

import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { SharedModule } from "@shared/shared.module";

import { CoreModule } from "./core/core.module";
import { DemoRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    DemoRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    // Fury Core Modules
    CoreModule
  ],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AdminModule {}
