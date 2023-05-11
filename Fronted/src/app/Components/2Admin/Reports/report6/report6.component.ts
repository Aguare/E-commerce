import { Component } from "@angular/core";
import { Revenue } from "src/app/Models/Revenue";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-report6",
  templateUrl: "./report6.component.html",
  styleUrls: ["./report6.component.scss"],
})
export class Report6Component {
  data: Revenue[] = [];
  dateInit = "";
  dateEnd = "";

  constructor(private consult: ConsultsService) {}

  generate() {
    if (this.dateInit && this.dateEnd) {
      this.consult
        .getReport6IntervalTime(this.dateInit, this.dateEnd)
        .subscribe((res) => {
          this.data = res;
        });
    } else {
      this.consult.getReport6All().subscribe((res) => {
        this.data = res;
        console.log(this.data);
      });
    }
  }

  clear() {
    this.dateEnd = "";
    this.dateInit = "";
  }
}
