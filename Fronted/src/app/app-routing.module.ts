import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignUpComponent } from './Components/General/login-sign-up/login-sign-up.component';
import { MainComponent } from './Components/General/main/main.component';
import { NavCommonComponent } from './Components/Navbars/nav-common/nav-common.component';
import { NavAdminComponent } from './Components/Navbars/nav-admin/nav-admin.component';
import { NavParcelComponent } from './Components/Navbars/nav-parcel/nav-parcel.component';
import { RegisterUserComponent } from './Components/2Admin/register-user/register-user.component';
import { ListUsersComponent } from './Components/2Admin/list-users/list-users.component';
import { ListReportsComponent } from './Components/2Admin/list-reports/list-reports.component';
import { HomeCommonComponent } from './Components/1Common/home-common/home-common.component';
import { MainHomeComponent } from './Components/General/main-home/main-home.component';
import { RegisterProductComponent } from './Components/1Common/register-product/register-product.component';
import { ListProductUserComponent } from './Components/1Common/list-product-user/list-product-user.component';

const routes: Routes = [
  {
    path: '',
    component: MainHomeComponent,
  },
  {
    path: 'login',
    component: LoginSignUpComponent,
  },
  {
    path: 'common',
    component: NavCommonComponent,
    children: [
      { path: 'home', component: HomeCommonComponent },
      { path: 'register-product', component: RegisterProductComponent },
      { path: 'list-products', component: ListProductUserComponent },
    ],
  },
  {
    path: 'admin',
    component: NavAdminComponent,
    children: [
      { path: 'register-user/:id', component: RegisterUserComponent },
      { path: 'list-user', component: ListUsersComponent },
      { path: 'list-reports', component: ListReportsComponent },
    ],
  },
  {
    path: 'parcel',
    component: NavParcelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
