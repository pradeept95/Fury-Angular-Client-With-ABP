import {
  Component,
  OnInit,
  Injector,
  OnDestroy,
  Input,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto
} from "@shared/paged-listing-component-base";
import {
  TemplateDto,
  TemplateServiceProxy
} from "@shared/service-proxies/service-proxies";
import { ListColumn } from "@shared/app-shared/list/list-column.model";
import { MatPaginator, MatSort } from "@angular/material";
import {
  template_service_per,
  template_service_delete_per,
  template_service_read_per
} from "@shared/permission-helper/permission-names";
import { Router } from "@angular/router";

@Component({
  selector: "fury-email-template",
  templateUrl: "./email-template.component.html",
  styleUrls: ["./email-template.component.scss"]
})
export class EmailTemplateComponent
  extends PagedListingComponentBase<TemplateDto>
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  templates: TemplateDto[];

  @Input()
  columns: ListColumn[] = [
    {
      name: "Template Key",
      property: "keyName",
      visible: true,
      isModelProperty: true
    },
    {
      name: "Name",
      property: "displayName",
      visible: true,
      isModelProperty: true
    },
    {
      name: "Template Content",
      property: "templateContent",
      visible: false,
      isModelProperty: true
    },
    { name: "Actions", property: "actions", visible: true }
  ] as ListColumn[];

  constructor(
    private injector: Injector,
    private _templateService: TemplateServiceProxy,
    private _router: Router
  ) {
    super(injector);
  }

  get visibleColumns() {
    return this.columns
      .filter(column => column.visible)
      .map(column => column.property);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  protected list(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    if (!this.isGranted(template_service_read_per)) {
      this.snackbar.open(
        "Permission is not granted to perform this action.",
        "OK",
        {
          duration: 10000
        }
      );
      return;
    }
    this._templateService
      .getPagedAsync(
        request.skipCount,
        request.maxResultCount,
        this.searchText,
        this.isAsc,
        this.sortActiveColumn
      )
      // .finally(() => {
      //   finishedCallback();
      // })
      .subscribe(result => {
        this.templates = result.items;
        this.dataSource.data = this.templates;
        if (this.totalItems == 0 || this.totalItems != result.totalCount)
          this.totalItems = result.totalCount;

        finishedCallback();
      });
  }

  create = () => {
    this._router.navigate(["/admin/templates", "Create"], {});
  };

  update = (entity: TemplateDto) => {
    this._router.navigate(["/admin/templates", "Edit"], {
      queryParams: { q: entity.id }
    });
  };

  protected delete(entity: TemplateDto): void {
    if (!this.isGranted(template_service_delete_per)) {
      this.notify.warn("Permission is not granted to perform this action.");
      return;
    }
    abp.message.confirm(
      "Delete template '" + entity.displayName + "'?",
      (result: boolean) => {
        if (result) {
          this._templateService.delete(entity.id).subscribe(() => {
            abp.notify.info("Deleted User: " + entity.displayName);
            this.refresh();
          });
        }
      }
    );
  }

  ngOnDestroy() {}
}
