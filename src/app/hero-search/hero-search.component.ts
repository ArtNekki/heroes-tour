import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';
import {Hero} from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchItems$ = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchItems$
      .pipe(
          tap((value) => {
            console.log('search', value);
          }),
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term: string) => this.heroService.search(term))
        );
  }

  search(value: string): void {
    this.searchItems$.next(value);
  }
}
