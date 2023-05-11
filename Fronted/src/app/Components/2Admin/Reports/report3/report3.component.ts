import { Component } from "@angular/core";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-report3",
  templateUrl: "./report3.component.html",
  styleUrls: ["./report3.component.scss"],
})
export class Report3Component {
  data: any[] = [];
  dateInit = "";
  dateEnd = "";

  constructor(private consult: ConsultsService) {}

  generate() {
    if (this.dateInit && this.dateEnd) {
      this.consult
        .getReport3IntervalTime(this.dateInit, this.dateEnd)
        .subscribe((res) => {
          this.data = res;
          console.log(this.data);
        });
    } else {
      this.consult.getReport3All().subscribe((res) => {
        this.data = res;
      });
    }
  }

  clear() {
    this.dateEnd = "";
    this.dateInit = "";
  }
}
