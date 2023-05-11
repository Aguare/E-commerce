import { Component } from "@angular/core";
import { User } from "src/app/Models/User";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"],
})
export class ListUsersComponent {
  users: User[] | null = null;

  constructor(private consult: ConsultsService) {
    this.consult.getAllEmployees().subscribe((users: any) => {
      this.users = users;
    });
  }
}
