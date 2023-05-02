import { Injectable } from "@angular/core";
import { User } from "../Models/User";
import { Product } from "../Models/Product";
import { Order } from "../Models/Order";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  add(data: any, key: string) {
    this.storage.setItem(key, JSON.stringify(data));
  }

  clear() {
    this.storage.clear();
  }

  get(key: string) {
    return this.storage.getItem(key);
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  getUser(): User {
    return JSON.parse(`${this.get("user")}`);
  }

  getCart(): Order {
    return JSON.parse(`${this.get("cart")}`);
  }

  saveCart(cart: Order) {
    this.add(cart, "cart");
  }

  clearCart() {
    this.remove("cart");
  }
}
