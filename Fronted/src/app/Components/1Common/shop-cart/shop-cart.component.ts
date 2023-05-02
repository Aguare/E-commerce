import { Component } from "@angular/core";
import { Order } from "src/app/Models/Order";
import { Product } from "src/app/Models/Product";
import { ProductOrder } from "src/app/Models/ProductOrder";
import { ConsultsService } from "src/app/Services/consults.service";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-shop-cart",
  templateUrl: "./shop-cart.component.html",
  styleUrls: ["./shop-cart.component.scss"],
})
export class ShopCartComponent {
  productOrder: ProductOrder[] = [];
  isBuy: boolean = false;
  order: Order = new Order(
    "",
    this.storage.getUser(),
    [],
    "",
    "",
    "",
    0,
    new Date(),
    new Date(),
    new Date()
  );
  total: number = 0;

  constructor(
    private storage: StorageService,
    private consult: ConsultsService
  ) {
    this.order = this.storage.getCart();
    if (this.order != null) {
      this.productOrder = this.order.products;
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = 0;
    this.productOrder.forEach((p) => {
      this.total += p.product.price * p.quantity;
    });
    this.order.total = this.total;
    this.storage.saveCart(this.order);
  }

  updateQuantity(product: ProductOrder, value: any) {
    let num = value.target.value;
    if (num > 0) {
      product.quantity = num;
      this.calculateTotal();
      this.storage.saveCart(this.order);
    }
  }

  deleteProduct(product: ProductOrder) {
    this.productOrder.forEach((p, index) => {
      if (p.product._id == product.product._id) {
        this.productOrder.splice(index, 1);
      }
    });
    this.calculateTotal();
    this.order.products = this.productOrder;
    this.storage.saveCart(this.order);
    window.location.reload();
  }

  clear() {
    this.storage.clearCart();
    window.location.reload();
  }

  buy() {
    this.isBuy = true;
    console.log(this.order);
  }
}
