import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredient: Ingredient = new Ingredient('', 0);  
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

  onIngredientDeleted(ingredient: Ingredient): void {
    const indexToDelete = this.ingredients.indexOf(ingredient);
    this.ingredients.splice(indexToDelete, 1);
  }

  onIngredientClicked(ingredient: Ingredient): void {
    this.ingredient = ingredient;
  }

}
