import { Component, Input } from "@angular/core";
import { Alert } from "src/app/Models/Alert";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent {
  @Input() alert: Alert = new Alert("", "", "danger", false, 404);
}
