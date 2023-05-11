import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Alert } from "src/app/Models/Alert";
import { Product } from "src/app/Models/Product";
import { ConsultsService } from "src/app/Services/consults.service";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-list-product-user",
  templateUrl: "./list-product-user.component.html",
  styleUrls: ["./list-product-user.component.scss"],
})
export class ListProductUserComponent {
  products: Product[] = [];
  alert: Alert = new Alert("", "", "", false, 0);

  constructor(
    private consult: ConsultsService,
    private storage: StorageService
  ) {
    let id = this.storage.getUser()._id;
    if (id != undefined && id != "") {
      this.consult.getAllProductsByUser(id).subscribe((res) => {
        this.products = res;
      });
    }
  }

  transformDate(date: any): any {
    const newDate = new Date(date);
    const datePipe = new DatePipe("en-US");
    return datePipe.transform(newDate, "dd/MM/yyyy");
  }
}
