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
  RoleServiceProxy,
  RoleDto
} from "@shared/service-proxies/service-proxies";
import { ListColumn } from "@shared/app-shared/list/list-column.model";
import { MatPaginator, MatSort } from "@angular/material";
import { Router } from "@angular/router";
import { finalize } from "rxjs/operators";

@Component({
  selector: "fury-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"]
})
export class RoleComponent extends PagedListingComponentBase<RoleDto>
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  roles: RoleDto[];

  @Input()
  columns: ListColumn[] = [
    {
      name: "Name",
      property: "name",
      visible: true,
      isModelProperty: true
    },
    {
      name: "Display Name",
      property: "displayName",
      visible: true,
      isModelProperty: true
    },
    {
      name: "Description",
      property: "description",
      visible: true,
      isModelProperty: true
    },
    { name: "Actions", property: "actions", visible: true }
  ] as ListColumn[];

  constructor(
    private injector: Injector,
    private _router: Router,
    private _roleService: RoleServiceProxy
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
    // if (!this.isGranted(template_service_read_per)) {
    //   this.snackbar.open(
    //     "Permission is not granted to perform this action.",
    //     "OK",
    //     {
    //       duration: 10000
    //     }
    //   );
    //   return;
    // }
    this._roleService
      .getPagedAsync(
        request.skipCount,
        request.maxResultCount,
        this.searchText,
        this.isAsc,
        this.sortActiveColumn
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe(result => {
        this.roles = result.items;
        this.dataSource.data = this.roles;
        if (this.totalItems == 0 || this.totalItems != result.totalCount)
          this.totalItems = result.totalCount;
      });
  }

  create = () => {
    this._router.navigate(["/admin/roles", "Create"], {});
  };

  update = (entity: RoleDto) => {
    this._router.navigate(["/admin/roles", "Edit"], {
      queryParams: { q: entity.id }
    });
  };

  protected delete(entity: RoleDto): void {
    // if (!this.isGranted(template_service_delete_per)) {
    //   this.notify.warn("Permission is not granted to perform this action.");
    //   return;
    // }
    abp.message.confirm(
      "Delete role '" + entity.displayName + "'?",
      (result: boolean) => {
        if (result) {
          this._roleService.delete(entity.id).subscribe(() => {
            abp.notify.info("Deleted role : " + entity.displayName);
            this.refresh();
          });
        }
      }
    );
  }

  ngOnDestroy() {}
}
