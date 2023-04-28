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
      gap: "0",
      padding: {
        right: "1px",
        left: "1px",
      },
      width: "100%",
      pagination: false,
      arrows: true,
      autoplay: true,
      interval: 5000,
      focus: "center",
    });
    splide.mount();
  }
}
