import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { MatToolbarModule, MatExpansionModule, MatPaginatorModule } from '@angular/material';

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
import { BsCarouselComponent } from './bs-carousel/bs-carousel.component';
import { OceansideHeaderComponent } from './oceanside-header/oceanside-header.component';
import { PopularProductsComponent } from './items/popular-products/popular-products.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './auth-interceptor';
import { MenProductsComponent } from './items/men-products/men-products.component';
import { MsweaterComponent } from './items/men-products/msweater/msweater.component';
import { MpantsComponent } from './items/men-products/mpants/mpants.component';
import { WomenProductsComponent } from './items/women-products/women-products.component';
import { WsweaterComponent } from './items/women-products/wsweater/wsweater.component';
import { WpantsComponent } from './items/women-products/wpants/wpants.component';
import { ItemviewComponent } from './items/itemview/itemview.component';
import { ItemdisplayComponent } from './items/itemdisplay/itemdisplay.component';
import { AuthGuard } from './auth.guard';
import { SalesComponent } from './items/sales/sales.component';
import { ProfileComponent } from './profile/profile.component';

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
    LoginComponent,
    BsCarouselComponent,
    OceansideHeaderComponent,
    PopularProductsComponent,
    SignupComponent,
    MenProductsComponent,
    MsweaterComponent,
    MpantsComponent,
    WomenProductsComponent,
    WsweaterComponent,
    WpantsComponent,
    ItemviewComponent,
    ItemdisplayComponent,
    SalesComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products', component: ItemCatalogComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent },
      { path: 'order-complete', component: OrderCompleteComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'admin/products', component: AdminItemCatalogComponent },
      { path: 'men', component: MenProductsComponent },
      { path: 'men/sweaters', component: MsweaterComponent },
      { path: 'men/pants', component: MpantsComponent },
      { path: 'women', component: WomenProductsComponent },
      { path: 'women/sweaters', component: WsweaterComponent },
      { path: 'women/pants', component: WpantsComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'item/:id', component: ItemviewComponent },
      { path: 'profile', component: ProfileComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
