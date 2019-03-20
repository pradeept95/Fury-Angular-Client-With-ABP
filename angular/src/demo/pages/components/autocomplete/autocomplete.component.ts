import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import escape from 'lodash-es/escape';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'fury-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  autocompleteHTML: string =
    escape(`<mat-input-container>
  <mat-label>State</mat-label>
  <input type="text" matInput [matAutocomplete]="auto" [formControl]="stateCtrl">
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of options" [value]="option">
      {{ option }}
    </mat-option>
  </mat-autocomplete>
</mat-input-container>
`);

  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  states: any[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  ngOnInit() {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => state ? this.filterStates(state) : this.states.slice())
    );
  }

  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
