import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Alert } from "src/app/Models/Alert";
import { Order } from "src/app/Models/Order";
import { ConsultsService } from "src/app/Services/consults.service";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-view-order",
  templateUrl: "./view-order.component.html",
  styleUrls: ["./view-order.component.scss"],
})
export class ViewOrderComponent {
  alert: Alert = new Alert("", "", "", false, 0);
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

  constructor(
    private storage: StorageService,
    private consult: ConsultsService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.consult.getOrderById(id).subscribe(
        (res) => {
          this.order = res;
          console.log(this.order);
        },
        (err) => {
          this.alert = new Alert(
            "Error",
            "No se ha encontrado la orden",
            "danger",
            true,
            0
          );
        }
      );
    } else {
      this.alert = new Alert(
        "Error",
        "No se ha encontrado la orden",
        "danger",
        true,
        0
      );
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

  cancelOrder() {
    if (this.order._id) {
      this.consult.cancelOrder(this.order._id).subscribe(
        (res) => {
          this.alert = new Alert(
            "Cancelado",
            "Se ha cancelado la orden",
            "success",
            true,
            0
          );
          this.order.status = "canceled";
          window.location.reload();
        },
        (err) => {
          this.alert = err.error;
        }
      );
    }
  }
}
