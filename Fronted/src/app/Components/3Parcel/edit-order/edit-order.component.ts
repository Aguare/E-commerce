import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Order } from "src/app/Models/Order";
import { User } from "src/app/Models/User";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-edit-order",
  templateUrl: "./edit-order.component.html",
  styleUrls: ["./edit-order.component.scss"],
})
export class EditOrderComponent {
  @Input() order: Order | null = null;
  status: string = "pending";
  date: string = "";

  constructor(private consult: ConsultsService) {}

  updateDate(event: any) {
    this.date = event.target.value;
    let newDate = new Date(this.date);
    if (this.order != null) {
      this.order.date_delivered = newDate;
    }
  }

  updateStatus(event: any) {
    this.status = event.target.value;
    if (this.order != null) {
      this.order.status = this.status;
    }
  }

  transformDate(date: any): any {
    const newDate = new Date(date);
    return newDate.toISOString().substring(0, 10);
  }

  updateOrder() {
    if (this.order) {
      this.consult.updateOrder(this.order).subscribe((res) => {
        window.location.reload();
      });
    }
  }
}
