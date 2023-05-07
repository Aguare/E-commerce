import { Component } from "@angular/core";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-report5",
  templateUrl: "./report5.component.html",
  styleUrls: ["./report5.component.scss"],
})
export class Report5Component {
  data: any[] = [];

  constructor(private consult: ConsultsService) {
    this.consult.getReport5().subscribe((res) => {
      this.data = res;
      console.log(this.data);
    });
  }
}
