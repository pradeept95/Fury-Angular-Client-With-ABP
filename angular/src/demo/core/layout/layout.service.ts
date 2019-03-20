import { Injectable } from '@angular/core';
import SimpleBar from 'simplebar';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  scrollbar: SimpleBar;

  constructor() {
  }
}
