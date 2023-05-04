import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavMainComponent } from "./Components/Navbars/nav-main/nav-main.component";
import { CarouselImagesComponent } from "./Components/Ads/carousel-images/carousel-images.component";
import { CarouselCategorysComponent } from "./Components/Ads/carousel-categorys/carousel-categorys.component";
import { CardProductComponent } from "./Components/Products/card-product/card-product.component";
import { CarouselProductsComponent } from "./Components/Products/carousel-products/carousel-products.component";
import { LoginSignUpComponent } from "./Components/General/login-sign-up/login-sign-up.component";
import { MainComponent } from "./Components/General/main/main.component";
import { AlertComponent } from "./Components/General/alert/alert.component";
import { NavCommonComponent } from "./Components/Navbars/nav-common/nav-common.component";
import { NavAdminComponent } from "./Components/Navbars/nav-admin/nav-admin.component";
import { NavParcelComponent } from "./Components/Navbars/nav-parcel/nav-parcel.component";
import { RegisterUserComponent } from "./Components/2Admin/register-user/register-user.component";
import { ListUsersComponent } from "./Components/2Admin/list-users/list-users.component";
import { LogoutComponent } from "./Components/General/logout/logout.component";
import { ListReportsComponent } from "./Components/2Admin/list-reports/list-reports.component";
import { HomeCommonComponent } from "./Components/1Common/home-common/home-common.component";
import { MainHomeComponent } from "./Components/General/main-home/main-home.component";
import { RegisterProductComponent } from "./Components/1Common/register-product/register-product.component";
import { ListProductUserComponent } from "./Components/1Common/list-product-user/list-product-user.component";
import { registerLocaleData } from "@angular/common";
import { ViewProductComponent } from './Components/Products/view-product/view-product.component';
import { ShopCartComponent } from './Components/1Common/shop-cart/shop-cart.component';
import { ConfirmOrderComponent } from './Components/1Common/confirm-order/confirm-order.component';
import { ListOrdersComponent } from './Components/1Common/list-orders/list-orders.component';
import { ViewOrderComponent } from './Components/1Common/view-order/view-order.component';
import { ListProductsApproveComponent } from './Components/3Parcel/list-products-approve/list-products-approve.component';
import { ListOrderPendingComponent } from './Components/3Parcel/list-order-pending/list-order-pending.component';
import { EditOrderComponent } from './Components/3Parcel/edit-order/edit-order.component';
import { EditProductComponent } from './Components/3Parcel/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMainComponent,
    CarouselImagesComponent,
    CarouselCategorysComponent,
    CardProductComponent,
    CarouselProductsComponent,
    LoginSignUpComponent,
    MainComponent,
    AlertComponent,
    NavCommonComponent,
    NavAdminComponent,
    NavParcelComponent,
    RegisterUserComponent,
    ListUsersComponent,
    LogoutComponent,
    ListReportsComponent,
    HomeCommonComponent,
    MainHomeComponent,
    RegisterProductComponent,
    ListProductUserComponent,
    ViewProductComponent,
    ShopCartComponent,
    ConfirmOrderComponent,
    ListOrdersComponent,
    ViewOrderComponent,
    ListProductsApproveComponent,
    ListOrderPendingComponent,
    EditOrderComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
