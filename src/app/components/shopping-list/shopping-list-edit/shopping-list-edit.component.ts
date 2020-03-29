import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @Input() ingredient: Ingredient;
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientDeleted = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(): void {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

    if (ingName !== '' && ingAmount !== '' && ingAmount > 0) {
      this.ingredientAdded.emit(newIngredient);
      this.clearItem();
    }
  }

  onDeleteItem(): void {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const deletedIngredient = new Ingredient(ingName, ingAmount);

    if (ingName !== '') {
      this.ingredientDeleted.emit(deletedIngredient);
      this.clearItem();
    }
  }

  clearItem(): void {
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = ''; 
  }
}
