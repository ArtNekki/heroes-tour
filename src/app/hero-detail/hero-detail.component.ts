import {Component, Input, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroesService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.route.params.pipe(
      switchMap((params) => {
        return this.heroesService.getById(params.id);
      })
    )
      .subscribe((hero: Hero) => {
        this.hero = hero;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    this.heroesService.update(this.hero)
      .subscribe(() => this.goBack());
  }
}
