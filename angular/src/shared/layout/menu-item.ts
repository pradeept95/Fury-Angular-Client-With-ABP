export class MenuItem {
  name: string = "";
  permissionName: string = "";
  icon: string = "";
  route: string = "";
  items: MenuItem[];

  constructor(
    name: string,
    permissionName: string,
    icon: string,
    route: string,
    childItems: MenuItem[] = null
  ) {
    this.name = name;
    this.permissionName = permissionName;
    this.icon = icon;
    this.route = route;

    if (childItems) {
      this.items = childItems;
    } else {
      this.items = [];
    }
  }
}

export class SideNavItem {
  name: string;
  icon?: string;
  routeOrFunction?: any;
  parent?: SideNavItem;
  subItems?: SideNavItem[];
  position?: number;
  pathMatchExact?: boolean;
  badge?: string;
  badgeColor?: string;
  type?: "item" | "subheading";
  customClass?: string;
  permissionNames?: string = "";
  isAllPermissionRequired?: boolean = false;

  constructor(
    name: string,
    routeOrFunction: string,
    permissionNames: string,
    isAllPermissionRequired: boolean,
    icon: string,
    position?: number,
    subItems: SideNavItem[] = null,
    parent?: SideNavItem,
    type?: "item" | "subheading",
    customClass?: string,
    badge?: string,
    badgeColor?: string,
    pathMatchExact?: boolean
  ) {
    this.name = name;
    this.routeOrFunction = routeOrFunction;
    this.permissionNames = permissionNames;
    this.isAllPermissionRequired = isAllPermissionRequired;
    this.icon = icon;
    this.position = position;

    if (subItems) {
      this.subItems = subItems;
    } else {
      this.subItems = [];
    }

    if (parent) {
      this.parent = parent;
    } else {
      this.parent = null;
    }
    this.type = type;
    this.customClass = customClass;
    this.badge = badge;
    this.badgeColor = badgeColor;
    this.pathMatchExact = pathMatchExact;
  }
}
