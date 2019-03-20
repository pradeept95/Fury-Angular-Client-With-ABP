import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fury-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  text: string;

  constructor() { }

  ngOnInit() {
  }

}
