import { Component, Input } from "@angular/core";

@Component({
  selector: "app-car-p-general",
  templateUrl: "./car-p-general.component.html",
  styleUrls: ["./car-p-general.component.scss"],
})
export class CarPGeneralComponent {
  @Input() product: any | null = null;

  constructor() {}
}
