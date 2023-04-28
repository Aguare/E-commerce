import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { User } from "../Models/User";

@Injectable({
  providedIn: "root",
})
export class RedirectService {
  constructor(private redirect: Router, private storage: StorageService) {}
  user: User | null = null;
  redirectPage(address: string) {
    this.redirect.navigate([address]);
  }

  logout() {
    this.storage.clear();
    this.redirectPage("/login");
  }

  redirectLogin() {
    this.user = JSON.parse(`${this.storage.get("user")}`);
    switch (this.user?.type) {
      case "Admin":
        this.redirectPage("/admin");
        break;
      case "Common":
        this.redirectPage("/common/home");
        break;
      case "Parcel":
        this.redirectPage("/parcel");
        break;
      default:
        this.redirectPage("/login");
        break;
    }
  }
}
