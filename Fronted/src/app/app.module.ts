import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMainComponent } from './Components/Navbars/nav-main/nav-main.component';
import { CarouselImagesComponent } from './Components/Ads/carousel-images/carousel-images.component';
import { CarouselCategorysComponent } from './Components/Ads/carousel-categorys/carousel-categorys.component';
import { CardProductComponent } from './Components/Products/card-product/card-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMainComponent,
    CarouselImagesComponent,
    CarouselCategorysComponent,
    CardProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
