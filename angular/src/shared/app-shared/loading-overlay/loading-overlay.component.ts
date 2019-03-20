import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fury-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {

  @Input('isLoading') isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
