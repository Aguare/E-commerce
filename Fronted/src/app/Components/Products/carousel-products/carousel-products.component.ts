import { Component } from "@angular/core";
import Splide from "@splidejs/splide";

@Component({
  selector: "app-carousel-products",
  templateUrl: "./carousel-products.component.html",
  styleUrls: ["./carousel-products.component.scss"],
})
export class CarouselProductsComponent {
  ngAfterViewInit() {
    var splide = new Splide("#product-carousel", {
      type: "loop",
      perPage: 4,
      perMove: 1,
      gap: "1rem",
      padding: {
        right: "4rem",
        left: "4rem",
      },
      pagination: false,
      arrows: true,
      autoplay: true,
      interval: 5000,
      focus: "center",
    });
    splide.mount();
  }
}
