import { Component } from "@angular/core";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-nav-common",
  templateUrl: "./nav-common.component.html",
  styleUrls: ["./nav-common.component.scss"],
})
export class NavCommonComponent {
  products: number = 0;

  constructor(private storage: StorageService) {
    let cart = this.storage.getCart();
    if (cart != null) {
      this.products = cart.products.length;
    }
  }
}
