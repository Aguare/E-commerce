import { formatDate } from "@angular/common";
import { Component } from "@angular/core";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-report1",
  templateUrl: "./report1.component.html",
  styleUrls: ["./report1.component.scss"],
})
export class Report1Component {
  data: any[] = [];
  dateInit = "";
  dateEnd = "";

  constructor(private consult: ConsultsService) {}

  generate() {
    if (this.dateInit && this.dateEnd) {
      this.consult
        .getReport1IntervalTime(this.dateInit, this.dateEnd)
        .subscribe((res) => {
          this.data = res;
        });
    } else {
      this.consult.getReport1All().subscribe((res) => {
        this.data = res;
      });
    }
  }

  clear() {
    this.dateEnd = "";
    this.dateInit = "";
  }
}
