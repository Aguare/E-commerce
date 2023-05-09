import { Component } from "@angular/core";
import { RedirectService } from "src/app/Services/redirect.service";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-nav-common",
  templateUrl: "./nav-common.component.html",
  styleUrls: ["./nav-common.component.scss"],
})
export class NavCommonComponent {
  products: number = 0;
  search: string = "";

  constructor(
    private storage: StorageService,
    private redirect: RedirectService
  ) {
    let cart = this.storage.getCart();
    if (cart != null) {
      this.products = cart.products.length;
    }
  }

  searchProduct() {
    if (this.search != "") {
      this.redirect.redirectPage("common/search/" + this.search);
    }
  }
}
