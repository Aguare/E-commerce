import { Component } from "@angular/core";
import Splide from "@splidejs/splide";

@Component({
  selector: "app-carousel-categorys",
  templateUrl: "./carousel-categorys.component.html",
  styleUrls: ["./carousel-categorys.component.scss"],
})
export class CarouselCategorysComponent {
  ngAfterViewInit() {
    var splide = new Splide("#categorys-carousel", {
      type: "slide",
      perMove: 1,
      perPage: 7,
      gap: "10px",
      pagination: false,
      autoplay: false,
      arrows: true,
      pauseOnHover: true,
      breakpoints: {
        640: {
          perPage: 2,
          gap: "20px",
        },
        768: {
          perPage: 3,
          gap: "30px",
        },
      },
    });
    splide.mount();
  }
}
