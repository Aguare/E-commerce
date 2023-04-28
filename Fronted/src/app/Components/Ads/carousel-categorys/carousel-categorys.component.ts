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
      type: "loop",
      perMove: 1,
      perPage: 12,
      gap: "1px",
      padding: {
        right: "10px",
        left: "10px",
      },
      pagination: false,
      autoplay: false,
      arrows: true,
      pauseOnHover: true,
      breakpoints: {
        640: {
          perPage: 4,
          gap: "2px",
        },
        1000: {
          perPage: 5,
          gap: "3px",
        },
        1200: {
          perPage: 7,
          gap: "3px",
        },
        1400: {
          perPage: 9,
          gap: "3px",
        },
      },
    });
    splide.mount();
  }
}
