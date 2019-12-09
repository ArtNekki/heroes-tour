import { Injectable } from '@angular/core';



import { HEROES } from './mock-heroes';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    this.log('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(() => this.log('fetches heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getById(id): Observable<Hero> {
    this.log('HeroService: fetched hero by Id');
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Hero>(`getHeroe by Id ${id}`))
      );
  }

  add(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        catchError(this.handleError<Hero>('add hero'))
      );
  }

  delete(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    console.log('delete22', id);
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions)
      .pipe(
        tap((result) => {
          console.log('del result', result);
        }),
        catchError(this.handleError<Hero>('remove hero'))
      );
  }

  update(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((result) => console.log('result', result)),
        catchError(this.handleError<Hero>(`update hero`))
      );
  }

  search(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(() => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('error', error);

      this.log(`${operation} failed: ${error.statusText }`);

      return of(result as T);
    };
  }
}
