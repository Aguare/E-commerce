import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Order } from "src/app/Models/Order";
import { User } from "src/app/Models/User";
import { ConsultsService } from "src/app/Services/consults.service";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-list-orders",
  templateUrl: "./list-orders.component.html",
  styleUrls: ["./list-orders.component.scss"],
})
export class ListOrdersComponent {
  orders: Order[] = [];
  user: User = this.storage.getUser();

  constructor(
    private consult: ConsultsService,
    private storage: StorageService
  ) {
    if (this.user._id) {
      this.consult.getAllOrdersByUser(this.user._id).subscribe((res) => {
        this.orders = res;
      });
    }
  }

  transformDate(date: any): any {
    const newDate = new Date(date);
    const datePipe = new DatePipe("en-US");
    return datePipe.transform(newDate, "dd/MM/yyyy");
  }

  calculateDelivery(date: any): any {
    const newDate = new Date(date);
    const datePipe = new DatePipe("en-US");
    return datePipe.transform(
      newDate.setDate(newDate.getDate() + 5),
      "dd/MM/yyyy"
    );
  }
}
