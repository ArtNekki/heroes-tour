import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroesService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
   this.heroesService.getHeroes()
     .subscribe((heroes) => {
       this.heroes = heroes;
     });
  }

  addHero(name: string) {
    name = name.trim();

    if (!name) return;

    this.heroesService.add({ name } as Hero)
      .subscribe((hero) => {
        this.heroes = [...this.heroes, hero];
      });
  }

  delete(hero: Hero) {

    this.heroesService.delete(hero)
      .subscribe((deleted) => {
        console.log('dellll', deleted);
        this.heroes = [...this.heroes.filter((heroItem) => heroItem.id === deleted.id)];
      });
  }
}
