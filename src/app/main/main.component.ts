import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { OmdbService } from "./service/omdb.service";
import { Film, OMDbObject } from "../types";
import {MatTableDataSource} from "@angular/material/table";
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  myControl = new FormControl();
  //@ts-ignore
  options: Observable<Film[]>
  selected: Film | undefined;
  selected_full: OMDbObject | undefined;
  displayedColumns: string[];
  dataSource: MatTableDataSource<Film> | undefined;

  constructor(private omdb: OmdbService) {
    this.displayedColumns = [ 'Title', 'Year' ];
  }

  ngOnInit() {
    this.myControl.valueChanges.subscribe(current => {
      if (!current)
        return;

      if (current.length <= 4)
        return;

      this.omdb.get(current).subscribe(ans => {
        if (!ans) {
          console.log('undefined answer');
          return;
        }

        if (!ans.Response) {
          console.log('response error');
          return;
        }

        if (!ans.totalResults) {
          console.log('there are no results');
          return;
        }

        let films: Film[] = [];
        ans.Search.forEach(film => films.push(film));
        this.options = of(films);
      })
    })
  }

  setCurrentOption(opt: Film) {
    this.selected = opt;
    this.omdb.getFullInformation(opt.imdbID).subscribe(ans => {
      if (!ans) {
        console.log('undefined answer');
        return;
      }

      if (!ans.Plot) {
        console.log('there are no plot');
        return;
      }

      this.selected_full = ans;
    })
  }

  @ViewChild(MatAutocompleteTrigger) test: MatAutocompleteTrigger | undefined;
  setupTable() {
    if (this.test)
      this.test.closePanel();

    this.selected = undefined;

    this.options.subscribe(value => {
      this.dataSource = new MatTableDataSource<Film>(value);
    })
  }

}
