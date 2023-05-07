import { Component } from "@angular/core";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-report2",
  templateUrl: "./report2.component.html",
  styleUrls: ["./report2.component.scss"],
})
export class Report2Component {
  data: any[] = [];
  dateInit = "";
  dateEnd = "";

  constructor(private consult: ConsultsService) {}

  generate() {
    if (this.dateInit && this.dateEnd) {
      this.consult
        .getReport2IntervalTime(this.dateInit, this.dateEnd)
        .subscribe((res) => {
          this.data = res;
        });
    } else {
      this.consult.getReport2All().subscribe((res) => {
        this.data = res;
      });
    }
  }

  clear() {
    this.dateEnd = "";
    this.dateInit = "";
  }
}
