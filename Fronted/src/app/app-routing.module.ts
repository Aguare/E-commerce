import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginSignUpComponent } from "./Components/General/login-sign-up/login-sign-up.component";
import { MainComponent } from "./Components/General/main/main.component";
import { NavCommonComponent } from "./Components/Navbars/nav-common/nav-common.component";
import { NavAdminComponent } from "./Components/Navbars/nav-admin/nav-admin.component";
import { NavParcelComponent } from "./Components/Navbars/nav-parcel/nav-parcel.component";
import { RegisterUserComponent } from "./Components/2Admin/register-user/register-user.component";
import { ListUsersComponent } from "./Components/2Admin/list-users/list-users.component";
import { ListReportsComponent } from "./Components/2Admin/list-reports/list-reports.component";
import { HomeCommonComponent } from "./Components/1Common/home-common/home-common.component";
import { MainHomeComponent } from "./Components/General/main-home/main-home.component";
import { RegisterProductComponent } from "./Components/1Common/register-product/register-product.component";
import { ListProductUserComponent } from "./Components/1Common/list-product-user/list-product-user.component";
import { ViewProductComponent } from "./Components/Products/view-product/view-product.component";
import { ShopCartComponent } from "./Components/1Common/shop-cart/shop-cart.component";
import { ListOrdersComponent } from "./Components/1Common/list-orders/list-orders.component";
import { ViewOrderComponent } from "./Components/1Common/view-order/view-order.component";
import { ListOrderPendingComponent } from "./Components/3Parcel/list-order-pending/list-order-pending.component";
import { ListProductsApproveComponent } from "./Components/3Parcel/list-products-approve/list-products-approve.component";
import { Report1Component } from "./Components/2Admin/Reports/report1/report1.component";
import { Report2Component } from "./Components/2Admin/Reports/report2/report2.component";
import { Report3Component } from "./Components/2Admin/Reports/report3/report3.component";
import { Report4Component } from "./Components/2Admin/Reports/report4/report4.component";
import { Report5Component } from "./Components/2Admin/Reports/report5/report5.component";

const routes: Routes = [
  {
    path: "",
    component: MainHomeComponent,
  },
  {
    path: "login",
    component: LoginSignUpComponent,
  },
  {
    path: "common",
    component: NavCommonComponent,
    children: [
      { path: "home", component: HomeCommonComponent },
      { path: "register-product/:id", component: RegisterProductComponent },
      { path: "list-products", component: ListProductUserComponent },
      { path: "view-product/:id", component: ViewProductComponent },
      { path: "shop-cart", component: ShopCartComponent },
      { path: "list-orders", component: ListOrdersComponent },
      { path: "view-order/:id", component: ViewOrderComponent },
    ],
  },
  {
    path: "admin",
    component: NavAdminComponent,
    children: [
      { path: "register-user/:id", component: RegisterUserComponent },
      { path: "list-user", component: ListUsersComponent },
      { path: "list-reports", component: ListReportsComponent },
      { path: "report1", component: Report1Component },
      { path: "report2", component: Report2Component },
      { path: "report3", component: Report3Component },
      { path: "report4", component: Report4Component },
      { path: "report5", component: Report5Component },
    ],
  },
  {
    path: "parcel",
    component: NavParcelComponent,
    children: [
      { path: "list-orders-pending", component: ListOrderPendingComponent },
      {
        path: "list-products-approve",
        component: ListProductsApproveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
