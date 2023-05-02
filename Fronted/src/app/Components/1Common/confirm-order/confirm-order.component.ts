import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Alert } from "src/app/Models/Alert";
import { Card } from "src/app/Models/Card";
import { Departament } from "src/app/Models/Departament";
import { Order } from "src/app/Models/Order";
import { User } from "src/app/Models/User";
import { ConsultsService } from "src/app/Services/consults.service";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-confirm-order",
  templateUrl: "./confirm-order.component.html",
  styleUrls: ["./confirm-order.component.scss"],
})
export class ConfirmOrderComponent {
  alert: Alert = new Alert("", "", "", false, 0);
  departament: Departament[] = [];
  cards: Card[] = [];
  user: User = this.storage.getUser();
  departamentSelected: string = "San Marcos";
  currentMunicipios: string[] = [];
  selectedCardOb: Card = new Card("", 0, this.user, "", 0, 0, 0);
  order: Order = this.storage.getCart();
  isAddCard: boolean = false;

  selectMunicipio: string = "San Marcos";
  address: string = "";

  //Model for new Card
  cardNumber: number = 0;
  cardName: string = "";
  cardMonth: number = 1;
  cardYear: number = 2023;
  cardCvv: number = 1;

  constructor(
    private storage: StorageService,
    private consult: ConsultsService
  ) {
    this.consult.getDepartaments().subscribe((res) => {
      this.departament = res;
      this.currentMunicipios = this.departament[0].municipios;
    });
    if (this.user._id) {
      this.consult.getAllCardsByUser(this.user._id).subscribe((res) => {
        this.cards = res;
      });
    }
  }

  updateDepart(event: any) {
    this.departamentSelected = event.target.value;
    const departamento = this.departament.find(
      (dep) => dep.nombre === this.departamentSelected
    );
    this.currentMunicipios = departamento ? departamento.municipios : [];
  }

  updateMun(event: any) {
    this.selectMunicipio = event.target.value;
  }

  selectCard(card: Card) {
    this.selectedCardOb = card;
  }

  refresh() {
    window.location.reload();
  }

  calculateDelivery(): any {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    const newDate = new Date(date);
    this.order.date_delivered = newDate;
    console.log(this.order.date_delivered);
  }

  createOrder() {
    this.calculateDelivery();
    delete this.order._id;
    delete this.order.status;
    delete this.order.createdAt;
    delete this.order.updatedAt;
    this.order.address =
      this.address +
      ", " +
      this.selectMunicipio +
      ", " +
      this.departamentSelected;
    if (this.address.length < 5) {
      this.alert = new Alert(
        "Error",
        "La dirección y el municipio no pueden estar vacios",
        "warning",
        true,
        0
      );
    } else {
      if (this.isAddCard) {
        alert("Compra con tarjeta nueva");
        let nCard = new Card(
          "",
          this.cardNumber,
          this.user,
          this.cardName,
          this.cardCvv,
          this.cardMonth,
          this.cardYear
        );
        delete nCard._id;
        if (
          this.cardNumber > 0 &&
          this.cardName.length > 0 &&
          this.cardCvv > 0
        ) {
          this.consult.registerCard(nCard).subscribe(
            (res) => {
              this.selectedCardOb = res;
              if (res._id) {
                this.order.card = res._id;
              }
              if (this.alert.type == "success") {
                this.consult.registerOrder(this.order).subscribe(
                  (res) => {
                    this.alert = res;
                    this.storage.clearCart();
                  },
                  (err) => {
                    this.alert = err.error;
                  }
                );
              }
            },
            (err) => {
              this.alert = err.error;
            }
          );
        } else {
          this.alert = new Alert(
            "Error",
            "Campos incompletos",
            "danger",
            true,
            3000
          );
        }
      } else {
        alert("Compra con tarjeta ya registrada");
        if (this.selectedCardOb._id) {
          this.order.card = this.selectedCardOb._id;
        }
        this.consult.registerOrder(this.order).subscribe(
          (res) => {
            this.alert = res;
            this.storage.clearCart();
          },
          (err) => {
            this.alert = err.error;
          }
        );
      }
    }
  }
}
