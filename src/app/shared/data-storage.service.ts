import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {exhaustMap, map, take, tap} from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private baseURL: string = 'https://angular-complete-guide-ca57c.firebaseio.com/';
  private recipesURL: string = this.baseURL + 'recipes.json';

  constructor(private httpClient: HttpClient,
              private recipesService: RecipeService,
              private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.httpClient.put(this.recipesURL + '?auth=' + this.authService.userSubject.subscribe(user => user.token), recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap(user => {
        return this.httpClient.get<Recipe[]>(this.recipesURL, { params: new HttpParams().set('auth', user.token)});
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
