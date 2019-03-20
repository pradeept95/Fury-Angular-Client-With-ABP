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
import { DemoRoutingModule } from "./demo-routing.module";
import { DemoComponent } from "./demo.component";

@NgModule({
  declarations: [DemoComponent],
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
  bootstrap: [DemoComponent]
})
export class DemoModule {}
