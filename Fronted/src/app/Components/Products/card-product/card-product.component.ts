import { Component, Input } from "@angular/core";
import { Product } from "src/app/Models/Product";

@Component({
  selector: "app-card-product",
  templateUrl: "./card-product.component.html",
  styleUrls: ["./card-product.component.scss"],
})
export class CardProductComponent {
  @Input() product: Product | null = null;

  constructor() {}
}
