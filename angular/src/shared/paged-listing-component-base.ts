import { AppComponentBase } from "shared/app-component-base";
import { Injector, OnInit } from "@angular/core";
import { MatTableDataSource, Sort } from "@angular/material";

export class PagedResultDto {
  items: any[];
  totalCount: number;
}

export class EntityDto {
  id: number;
}

export class PagedRequestDto {
  skipCount: number;
  maxResultCount: number;
}

export abstract class PagedListingComponentBase<EntityDto>
  extends AppComponentBase
  implements OnInit {
  dataSource: MatTableDataSource<EntityDto> | null;

  //for filter
  public searchText: string = "";

  //for paging
  public pageSize: number = 10;
  public pageNumber: number = 1;
  public totalPages: number = 1;
  public totalItems: number = 0;
  public isTableLoading = false;
  public pageSizeOptions = [10, 25, 50, 100];

  //for sorting
  isAsc: boolean;
  sortActiveColumn: string = "";

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.refresh();
  }

  refresh(): void {
    this.getDataPage(this.pageNumber);
  }

  public onFilterChange(searchText) {
    this.searchText = searchText;
    this.refresh();
  }

  public changePageSize(pageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageNumber = pageEvent.pageIndex + 1;
    this.totalPages =
      (this.totalItems - (this.totalItems % this.pageSize)) / this.pageSize + 1;
    this.refresh();
  }

  public sortData(sort: Sort) {
    this.isAsc = sort.direction === "asc";
    this.sortActiveColumn = sort.active;
    this.refresh();
  }

  public showPaging(result: PagedResultDto, pageNumber: number): void {
    this.totalPages =
      (result.totalCount - (result.totalCount % this.pageSize)) /
        this.pageSize +
      1;

    this.totalItems = result.totalCount;
    this.pageNumber = pageNumber;
  }

  public getDataPage(page: number): void {
    var req = new PagedRequestDto();
    req.maxResultCount = this.pageSize;
    req.skipCount = (page - 1) * this.pageSize;

    this.isTableLoading = true;
    this.list(req, page, () => {
      this.isTableLoading = false;
    });
  }

  protected abstract list(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void;
  protected abstract delete(entity: EntityDto): void;
}
