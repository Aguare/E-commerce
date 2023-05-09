import { Component, Input } from "@angular/core";
import { Product } from "src/app/Models/Product";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-card-product",
  templateUrl: "./card-product.component.html",
  styleUrls: ["./card-product.component.scss"],
})
export class CardProductComponent {
  @Input() product: Product | null = null;
  path: string = "/login";

  constructor(private storage: StorageService) {}

  ngOnInit() {
    if (this.storage.getUser() == null) {
      this.path = `/login`;
    } else {
      console.log(this.product);
      this.path = "/common/view-product/" + this.product?._id;
    }
  }
}
