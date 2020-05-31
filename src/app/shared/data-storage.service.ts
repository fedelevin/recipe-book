import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private baseURL: string = 'https://angular-complete-guide-ca57c.firebaseio.com/';
  private recipesURL: string = this.baseURL + 'recipes.json';

  constructor(private httpClient: HttpClient,
              private recipesService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.httpClient.put(this.recipesURL, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    this.httpClient
      .get<Recipe[]>(this.recipesURL)
      .subscribe(recipes => {
        this.recipesService.setRecipes(recipes);
      });
  }
}
