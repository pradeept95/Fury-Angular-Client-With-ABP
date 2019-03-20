import { Injector, ElementRef } from "@angular/core";
import { AppConsts } from "@shared/AppConsts";
import { LocalizationService } from "@abp/localization/localization.service";
import { PermissionCheckerService } from "@abp/auth/permission-checker.service";
import { FeatureCheckerService } from "@abp/features/feature-checker.service";
import { NotifyService } from "@abp/notify/notify.service";
import { SettingService } from "@abp/settings/setting.service";
import { MessageService } from "@abp/message/message.service";
import { AbpMultiTenancyService } from "@abp/multi-tenancy/abp-multi-tenancy.service";
import { AppSessionService } from "@shared/session/app-session.service";
import { MatSnackBar } from "@angular/material";

export abstract class AppComponentBase {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  localization: LocalizationService;
  permission: PermissionCheckerService;
  feature: FeatureCheckerService;
  notify: NotifyService;
  setting: SettingService;
  message: MessageService;
  multiTenancy: AbpMultiTenancyService;
  appSession: AppSessionService;
  elementRef: ElementRef;
  // dialog: MatDialog;
  snackbar: MatSnackBar;

  constructor(injector: Injector) {
    this.localization = injector.get(LocalizationService);
    this.permission = injector.get(PermissionCheckerService);
    this.feature = injector.get(FeatureCheckerService);
    this.notify = injector.get(NotifyService);
    this.setting = injector.get(SettingService);
    this.message = injector.get(MessageService);
    this.multiTenancy = injector.get(AbpMultiTenancyService);
    this.appSession = injector.get(AppSessionService);
    this.elementRef = injector.get(ElementRef);
    // this.dialog = injector.get(MatDialog);
    this.snackbar = injector.get(MatSnackBar);
  }

  l(key: string, ...args: any[]): string {
    let localizedText = this.localization.localize(
      key,
      this.localizationSourceName
    );

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }

  isGranted(permissionName: string): boolean {
    return this.permission.isGranted(permissionName);
  }

  public isMultipleGranted(
    permissionNames: string,
    isAllPermissionRequired: boolean = false
  ): boolean {
    if (permissionNames) {
      let isGranted = false;
      var arr = permissionNames.toString().split(";");

      if (isAllPermissionRequired) {
        isGranted = true;
        for (let i = 0; i < arr.length; i++) {
          if (!abp.auth.isGranted(arr[i])) {
            isGranted = false;
          }
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (abp.auth.isGranted(arr[i])) {
            isGranted = true;
          }
        }
      }
      return isGranted;
    }
    return false;
  }
}
