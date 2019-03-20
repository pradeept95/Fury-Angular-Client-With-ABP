import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import SimpleBar from "simplebar";
import { routeAnimations } from "../animations/route.animations";
import { LayoutService } from "./layout.service";
import { scrollbarOptions } from "@shared/app-shared/scrollbar/scrollbar-options";

@Component({
  selector: "fury-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [routeAnimations]
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild("scrollContainer") scrollContainer: ElementRef;

  scrollbarDisabled = false;

  constructor(private zone: NgZone, private layoutService: LayoutService) {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.layoutService.scrollbar = new SimpleBar(
        this.scrollContainer.nativeElement,
        scrollbarOptions
      );
    });
  }

  onActivate(e, scrollContainer, outlet: RouterOutlet) {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      if (
        outlet.activatedRoute.snapshot.data.scrollbarDisabled &&
        !this.scrollbarDisabled
      ) {
        this.scrollbarDisabled = true;
        this.scrollContainer.nativeElement.classList.add("disable-simplebar");
      }

      if (
        !outlet.activatedRoute.snapshot.data.scrollbarDisabled &&
        this.scrollbarDisabled
      ) {
        this.scrollbarDisabled = false;
        this.scrollContainer.nativeElement.classList.remove(
          "disable-simplebar"
        );
      }
    }

    if (this.layoutService && this.layoutService.scrollbar) {
      this.layoutService.scrollbar.getScrollElement().scrollTop = 0;
    }
  }
}
