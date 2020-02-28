import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [],
  exports: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ShoppingListModule { }
