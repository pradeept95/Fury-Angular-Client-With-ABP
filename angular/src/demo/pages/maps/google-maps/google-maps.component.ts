import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fury-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  lat: number = 40.730610;
  lng: number = -73.935242;

  constructor() { }

  ngOnInit() {
  }

}
