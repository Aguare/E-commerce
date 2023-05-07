import { Component } from "@angular/core";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-report4",
  templateUrl: "./report4.component.html",
  styleUrls: ["./report4.component.scss"],
})
export class Report4Component {
  data: any[] = [];
  dateInit = "";
  dateEnd = "";

  constructor(private consult: ConsultsService) {}

  generate() {
    if (this.dateInit && this.dateEnd) {
      this.consult
        .getReport4IntervalTime(this.dateInit, this.dateEnd)
        .subscribe((res) => {
          this.data = res;
          console.log(this.data);
        });
    } else {
      this.consult.getReport4All().subscribe((res) => {
        this.data = res;
      });
    }
  }

  clear() {
    this.dateEnd = "";
    this.dateInit = "";
  }
}
