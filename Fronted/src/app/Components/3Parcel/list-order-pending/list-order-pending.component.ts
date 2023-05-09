import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Order } from "src/app/Models/Order";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-list-order-pending",
  templateUrl: "./list-order-pending.component.html",
  styleUrls: ["./list-order-pending.component.scss"],
})
export class ListOrderPendingComponent {
  orders: Order[] = [];
  orderEdit: Order = this.orders[0];

  constructor(private consult: ConsultsService) {
    this.consult.getAllOrdersInProcess().subscribe((res) => {
      this.orders = res;
      this.orderEdit = this.orders[0];
    });
  }

  changeEdit(order: Order) {
    this.orderEdit = order;
  }

  transformDate(date: any): any {
    const newDate = new Date(date);
    const datePipe = new DatePipe("en-US");
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    let test = datePipe.transform(newDate, "dd/MM/yyyy");
    return test;
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
