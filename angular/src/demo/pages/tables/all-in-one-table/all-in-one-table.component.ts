import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";
import { filter } from "rxjs/operators";
import { ALL_IN_ONE_TABLE_DEMO_DATA } from "./all-in-one-table.demo";
import { CustomerCreateUpdateComponent } from "./customer-create-update/customer-create-update.component";
import { Customer } from "./customer-create-update/customer.model";
import { ListColumn } from "@shared/app-shared/list/list-column.model";

@Component({
  selector: "fury-all-in-one-table",
  templateUrl: "./all-in-one-table.component.html",
  styleUrls: ["./all-in-one-table.component.scss"]
})
export class AllInOneTableComponent
  implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  data$: Observable<Customer[]> = this.subject$.asObservable();
  customers: Customer[];

  @Input()
  columns: ListColumn[] = [
    { name: "Checkbox", property: "checkbox", visible: false },
    { name: "Image", property: "image", visible: true },
    { name: "Name", property: "name", visible: true, isModelProperty: true },
    {
      name: "First Name",
      property: "firstName",
      visible: false,
      isModelProperty: true
    },
    {
      name: "Last Name",
      property: "lastName",
      visible: false,
      isModelProperty: true
    },
    {
      name: "Street",
      property: "street",
      visible: true,
      isModelProperty: true
    },
    {
      name: "Zipcode",
      property: "zipcode",
      visible: true,
      isModelProperty: true
    },
    { name: "City", property: "city", visible: true, isModelProperty: true },
    {
      name: "Phone",
      property: "phoneNumber",
      visible: true,
      isModelProperty: true
    },
    { name: "Actions", property: "actions", visible: true }
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Customer> | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog) {}

  get visibleColumns() {
    return this.columns
      .filter(column => column.visible)
      .map(column => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(
      ALL_IN_ONE_TABLE_DEMO_DATA.map(customer => new Customer(customer))
    );
  }

  ngOnInit() {
    this.getData().subscribe(customers => {
      this.subject$.next(customers);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter(Boolean)).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCustomer() {
    this.dialog
      .open(CustomerCreateUpdateComponent)
      .afterClosed()
      .subscribe((customer: Customer) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (customer) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          this.customers.unshift(new Customer(customer));
          this.subject$.next(this.customers);
        }
      });
  }

  updateCustomer(customer) {
    this.dialog
      .open(CustomerCreateUpdateComponent, {
        data: customer
      })
      .afterClosed()
      .subscribe(customer => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (customer) {
          /**
           * Here we are updating our local array.
           * You would probably make an HTTP request here.
           */
          const index = this.customers.findIndex(
            existingCustomer => existingCustomer.id === customer.id
          );
          this.customers[index] = new Customer(customer);
          this.subject$.next(this.customers);
        }
      });
  }

  deleteCustomer(customer) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.customers.splice(
      this.customers.findIndex(
        existingCustomer => existingCustomer.id === customer.id
      ),
      1
    );
    this.subject$.next(this.customers);
  }

  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  ngOnDestroy() {}
}
