import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import each from "lodash-es/each";
import isArray from "lodash-es/isArray";
import isEqual from "lodash-es/isEqual";
import keys from "lodash-es/keys";
import sortBy from "lodash-es/sortBy";
import { BehaviorSubject } from "rxjs";
import { SidenavState } from "./sidenav-state.enum";
import { MediaQueryService } from "@shared/app-shared/mediareplay/media-replay.service";
import { SideNavItem } from "@shared/layout/menu-item";

@Injectable()
export class SidenavService {
  /**
   * Sidenav Items
   * @type {BehaviorSubject<SidenavItem[]>}
   * @private
   */
  private _items = new BehaviorSubject<SideNavItem[]>([]);

  items$ = this._items.asObservable();

  get items(): SideNavItem[] {
    return this._items.getValue();
  }

  set items(items: SideNavItem[]) {
    this._items.next(items);
  }

  /**
   * Currently Open
   * @type {BehaviorSubject<SidenavItem[]>}
   * @private
   */
  private _currentlyOpen = new BehaviorSubject<SideNavItem[]>([]);

  currentlyOpen$ = this._currentlyOpen.asObservable();

  get currentlyOpen(): SideNavItem[] {
    return this._currentlyOpen.getValue();
  }

  set currentlyOpen(currentlyOpen: SideNavItem[]) {
    this._currentlyOpen.next(currentlyOpen);
  }

  isLowerThanLarge: boolean;

  constructor(
    private router: Router,
    private mediaQueryService: MediaQueryService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setCurrentlyOpenByRoute(event.url);

        if (this.isLowerThanLarge) {
          // Close Sidenav on Mobile after Route Change
          this.sidenavState = SidenavState.Mobile;
        }
      }
    });

    this.mediaQueryService.isLowerThanLarge$.subscribe(isLowerThanLarge => {
      this.isLowerThanLarge = isLowerThanLarge;
      if (
        isLowerThanLarge &&
        !(
          this.sidenavState === SidenavState.Mobile ||
          this.sidenavState === SidenavState.MobileOpen
        )
      ) {
        this.sidenavState = SidenavState.Mobile;
      } else if (!isLowerThanLarge) {
        this.sidenavState = SidenavState.Expanded;
      }
    });
  }

  /**
   * SidenavState for Animation
   * @type {BehaviorSubject<SidenavState>}
   * @private
   */
  private _sidenavState = new BehaviorSubject<SidenavState>(
    SidenavState.Expanded
  );

  sidenavState$ = this._sidenavState.asObservable();

  get sidenavState() {
    return this._sidenavState.getValue();
  }

  set sidenavState(sidenavState: SidenavState) {
    this._sidenavState.next(sidenavState);
  }

  addItem(item: SideNavItem) {
    const foundIndex = this.items.findIndex(existingItem =>
      isEqual(existingItem, item)
    );
    if (foundIndex === -1) {
      this.setParentRecursive(item);
      this.items = [...this.items, item];
    }
  }

  toggleItemOpen(item: SideNavItem) {
    let currentlyOpen = this.currentlyOpen;

    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = currentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [];
      }
    } else {
      currentlyOpen = this.getParents(item);
    }

    this.currentlyOpen = currentlyOpen;
  }

  sortRecursive(array: SideNavItem[], propertyName: string): SideNavItem[] {
    const that = this;

    array.forEach(function(item) {
      const keyArray = keys(item);
      keyArray.forEach(function(key) {
        if (isArray(item[key])) {
          item[key] = that.sortRecursive(item[key], propertyName);
        }
      });
    });

    return sortBy(array, propertyName);
  }

  getItemByRoute(route) {
    return this.getItemByRouteRecursive(route, this.items);
  }

  private getParents(item: SideNavItem, items: SideNavItem[] = []) {
    items.unshift(item);

    if (item.parent) {
      return this.getParents(item.parent, items);
    } else {
      return items;
    }
  }

  private isOpen(item: SideNavItem) {
    return this.currentlyOpen.indexOf(item) > -1;
  }

  private setCurrentlyOpenByRoute(route: string) {
    const item = this.getItemByRouteRecursive(route, this.items);
    let currentlyOpen = [];

    if (item && item.parent) {
      currentlyOpen = this.getParents(item);
    } else if (item) {
      currentlyOpen = [item];
    }

    this.currentlyOpen = currentlyOpen;
  }

  private getItemByRouteRecursive(route: string, collection: SideNavItem[]) {
    let result = collection.find(i => i.routeOrFunction === route);

    if (!result) {
      each(collection, item => {
        if (item && item.subItems && item.subItems.length > 0) {
          const found = this.getItemByRouteRecursive(route, item.subItems);

          if (found) {
            result = found;
            return false;
          }
        }
      });
    }

    return result;
  }

  private setParentRecursive(item: SideNavItem) {
    if (item.subItems && item.subItems.length > 0) {
      item.subItems.forEach(subItem => {
        subItem.parent = item;
        this.setParentRecursive(subItem);
      });
    }
  }
}
