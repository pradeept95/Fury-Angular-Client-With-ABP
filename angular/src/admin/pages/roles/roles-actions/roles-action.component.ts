import { Component, OnInit, Injector } from "@angular/core";
import {
  RoleServiceProxy,
  RoleDto,
  GetRoleForEditOutput
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { TreeviewItem } from "ngx-treeview";
import { finalize } from "rxjs/operators";

@Component({
  selector: "fury-role-actions",
  templateUrl: "./roles-action.component.html",
  styleUrls: ["./roles-action.component.scss"]
})
export class RoleActionComponent extends AppComponentBase implements OnInit {
  mode: string; //"Create" | "Edit" | "Detail";
  role: GetRoleForEditOutput = new GetRoleForEditOutput();
  saveModel: RoleDto = new RoleDto();

  entityId: string = "";
  form: FormGroup;
  allPermissions: TreeviewItem[] = [];

  treeViewConfig: any = {
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500
  };

  values: any[];

  constructor(
    private injector: Injector,
    private _roleService: RoleServiceProxy,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    super(injector);
    this.route.queryParams.subscribe(params => {
      if (params["q"]) this.entityId = decodeURIComponent(params["q"]);
    });

    this.route.paramMap.subscribe(params => {
      this.mode = params.get("mode").toLowerCase();
    });
  }

  ngOnInit() {
    if (
      this.mode !== "create" &&
      this.mode !== "edit" &&
      this.mode !== "detail"
    ) {
      this.goToRole();
      return;
    }

    this.prepareForm();
  }

  prepareForm = () => {
    this.form = this.fb.group({
      id: [null],
      name: ["", Validators.required],
      displayName: ["", Validators.required],
      description: [""],
      permissions: []
    });

    this.getValueForEdit();
  };

  getAllPermissions = () => {};

  getValueForEdit = () => {
    if (
      this.entityId == "" ||
      this.entityId == null ||
      this.entityId == undefined
    ) {
      this.entityId = "0";
    }
    this.spinner.show();
    this._roleService
      .getRoleForEditWithHierarchy(Number(this.entityId))
      // .finally(() => {
      //   finishedCallback();
      // })
      .subscribe(result => {
        this.spinner.hide();
        this.role = result;
        if (this.mode == "edit") {
          this.form.patchValue({
            id: this.role.role.id,
            name: this.role.role.name,
            displayName: this.role.role.displayName,
            description: this.role.role.description,
            permissions: this.role.grantedPermissionNames
          });
        }
        this.prepareForPermissions(result.permissionsHierarchy);
      });
  };

  prepareForPermissions = permissions => {
    permissions.forEach(permission => {
      let item = new TreeviewItem({
        text: permission.displayName,
        value: permission.name,
        checked: permission.isAssigned,
        children: permission.childPermission.map(innerItem => {
          return new TreeviewItem({
            text: innerItem.displayName,
            value: innerItem.name,
            checked: innerItem.isAssigned,
            children: innerItem.childPermission.map(innerInnerItem => {
              return new TreeviewItem({
                text: innerInnerItem.displayName,
                value: innerInnerItem.name,
                checked: innerInnerItem.isAssigned
              });
            })
          });
        })
      });
      this.allPermissions.push(item);
    });
  };

  onPermissionSelectedChange = $event => {
    let permissions = $event;
    $event.forEach(permission => {
      if (permission.split(".").length == 3) {
        var parentPermissionList = permission.split(".");
        var parentPermission = `${parentPermissionList[0]}.${
          parentPermissionList[1]
        }`;
        if (permissions.indexOf(parentPermission) < 0) {
          permissions = [...permissions, parentPermission];
        }
        if (permissions.indexOf(parentPermissionList[0]) < 0) {
          permissions = [...permissions, parentPermissionList[0]];
        }
      }
    });
    this.form.patchValue({ permissions: permissions });
  };

  submit() {
    if (this.form.invalid) {
      this.notify.warn("Please enter all required fields");
      return;
    }

    this.snackbar.open("Your Request is proceed.", null, {
      duration: 2000
    });

    if (this.mode == "create") {
      this.create();
    } else if (this.mode == "edit") {
      this.update();
    } else {
      this.snackbar.open("Your Request is not valid.", null, {
        duration: 2000
      });
    }
  }

  goToRole = () => {
    this._router.navigate(["/admin/roles"]);
  };

  create = () => {
    const roleModel: RoleDto = Object.assign(
      {},
      this.saveModel,
      this.form.value
    );
    this.spinner.show();
    this._roleService
      .create(roleModel)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(res => {
        if (res) {
          this.notify.success("Role successfully created.");
          this.goToRole();
        }
      });
  };

  update = () => {
    const roleModel: RoleDto = Object.assign(
      {},
      this.saveModel,
      this.form.value
    );
    this.spinner.show();
    this._roleService
      .update(roleModel)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(res => {
        if (res) {
          this.notify.success("Role successfully Upated.");
          this.goToRole();
        }
      });
  };
}
