import { Component } from "@angular/core";
import { RedirectService } from "src/app/Services/redirect.service";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent {
  nameUser: string = this.storage.getUser().username;

  constructor(
    private storage: StorageService,
    private redirect: RedirectService
  ) {}

  logout() {
    this.storage.clear();
    this.redirect.logout();
  }
}
