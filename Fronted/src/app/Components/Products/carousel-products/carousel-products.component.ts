import { Component } from "@angular/core";
import Splide from "@splidejs/splide";
import { Product } from "src/app/Models/Product";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-carousel-products",
  templateUrl: "./carousel-products.component.html",
  styleUrls: ["./carousel-products.component.scss"],
})
export class CarouselProductsComponent {
  products: Product[] = [];

  constructor(private consult: ConsultsService) {
    this.consult.getCarouselProducts().subscribe((res) => {
      this.products = res;
    });
  }

  ngAfterViewInit() {
    var splide = new Splide("#product-carousel", {
      type: "loop",
      perPage: 4,
      perMove: 1,
      gap: "0",
      padding: {
        right: "0px",
        left: "0px",
      },
      pagination: false,
      arrows: true,
      autoplay: true,
      interval: 5000,
    });
    splide.mount();
  }
}
