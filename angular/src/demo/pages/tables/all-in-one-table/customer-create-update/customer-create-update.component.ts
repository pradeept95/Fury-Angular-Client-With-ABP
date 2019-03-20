import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Customer } from "./customer.model";

@Component({
  selector: "fury-customer-create-update",
  templateUrl: "./customer-create-update.component.html",
  styleUrls: ["./customer-create-update.component.scss"]
})
export class CustomerCreateUpdateComponent implements OnInit {
  static id = 100;

  form: FormGroup;
  mode: "create" | "update" | "detail" = "create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CustomerCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = "update";
    } else {
      this.defaults = {} as Customer;
    }

    this.form = this.fb.group({
      id: [CustomerCreateUpdateComponent.id++],
      firstName: [this.defaults.firstName || ""],
      lastName: [this.defaults.lastName || ""],
      street: this.defaults.street || "",
      city: this.defaults.city || "",
      zipcode: this.defaults.zipcode || "",
      phoneNumber: this.defaults.phoneNumber || ""
    });
  }

  save() {
    if (this.mode === "create") {
      this.createCustomer();
    } else if (this.mode === "update") {
      this.updateCustomer();
    }
  }

  createCustomer() {
    const customer = this.form.value;
    this.dialogRef.close(customer);
  }

  updateCustomer() {
    const customer = this.form.value;
    customer.id = this.defaults.id;

    this.dialogRef.close(customer);
  }

  isCreateMode() {
    return this.mode === "create";
  }

  isUpdateMode() {
    return this.mode === "update";
  }
}
