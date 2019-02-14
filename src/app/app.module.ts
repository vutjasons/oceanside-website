import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ItemCatalogComponent } from './item-catalog/item-catalog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminItemCatalogComponent } from './admin/admin-item-catalog/admin-item-catalog.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ItemCatalogComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderCompleteComponent,
    OrderHistoryComponent,
    AdminItemCatalogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'products', component: ItemCatalogComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'order-complete', component: OrderCompleteComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin/products', component: AdminItemCatalogComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
