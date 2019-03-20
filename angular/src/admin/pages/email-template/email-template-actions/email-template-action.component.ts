import { Component, OnInit, Injector } from "@angular/core";
import {
  RoleServiceProxy,
  RoleDto,
  GetRoleForEditOutput,
  TemplateServiceProxy,
  TemplateDto
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs/operators";

@Component({
  selector: "fury-email-template-actions",
  templateUrl: "./email-template-action.component.html",
  styleUrls: ["./email-template-action.component.scss"]
})
export class EmailTemplateActionComponent extends AppComponentBase
  implements OnInit {
  mode: string; //"Create" | "Edit" | "Detail";
  template: TemplateDto = new TemplateDto();
  saveModel: RoleDto = new RoleDto();

  entityId: string = "";
  form: FormGroup;

  values: any[];

  constructor(
    private injector: Injector,
    private _router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _templateService: TemplateServiceProxy,
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
      this.goToTemplate();
      return;
    }

    this.prepareForm();
  }

  prepareForm = () => {
    this.form = this.fb.group({
      id: ["00000000-0000-0000-0000-000000000000"],
      keyName: ["", Validators.required],
      displayName: ["", Validators.required],
      templateContent: ["", Validators.required],
      isActive: [true]
    });
    if (this.mode == "edit") {
      this.getValueForEdit();
    }
  };

  getValueForEdit = () => {
    if (
      this.entityId == "" ||
      this.entityId == null ||
      this.entityId == undefined
    ) {
      this.entityId = "0";
    }
    this.spinner.show();
    this._templateService
      .get(this.entityId)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(result => {
        this.spinner.hide();
        this.template = result;
        if (this.mode == "edit") {
          this.form.patchValue({
            id: this.template.id,
            keyName: this.template.keyName,
            displayName: this.template.displayName,
            templateContent: this.template.templateContent,
            isActive: this.template.isActive
          });
        }
      });
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

  goToTemplate = () => {
    this._router.navigate(["/admin/templates"]);
  };

  create = () => {
    const templateDto: TemplateDto = Object.assign(
      {},
      this.saveModel,
      this.form.value
    );
    this.spinner.show();
    this._templateService
      .create(templateDto)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(res => {
        if (res) {
          this.notify.success("Template successfully created.");
          this.goToTemplate();
        }
      });
  };

  update = () => {
    const templateDto: TemplateDto = Object.assign(
      {},
      this.saveModel,
      this.form.value
    );
    this.spinner.show();
    this._templateService
      .update(templateDto)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe(res => {
        if (res) {
          this.notify.success("Template successfully Upated.");
          this.goToTemplate();
        }
      });
  };
}
