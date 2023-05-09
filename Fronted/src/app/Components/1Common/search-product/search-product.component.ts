import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Alert } from "src/app/Models/Alert";
import { Product } from "src/app/Models/Product";
import { ConsultsService } from "src/app/Services/consults.service";

@Component({
  selector: "app-search-product",
  templateUrl: "./search-product.component.html",
  styleUrls: ["./search-product.component.scss"],
})
export class SearchProductComponent {
  range: number = 0;
  categorys: string[] = [];
  search: string = "";
  products: Product[] = [];
  maxRange: number = 10000;
  alert = new Alert(
    "Losiento :(",
    "No encuentro lo que buscas",
    "warning",
    false,
    5
  );

  constructor(private consult: ConsultsService, private route: ActivatedRoute) {
    let name = this.route.snapshot.paramMap.get("name");
    if (name) {
      if (name != "new") {
        this.search = name;
        this.searchProduct();
        this.getMaxRange();
      }
    }
  }

  //add categorys is select, deleted is unselect
  addCategory(category: string) {
    if (this.categorys.includes(category)) {
      this.categorys.splice(this.categorys.indexOf(category), 1);
    } else {
      this.categorys.push(category);
    }
  }

  //change sort
  changeSort() {
    this.products.reverse();
  }

  searchProduct() {
    console.log(this.categorys);
    this.consult
      .searchProducts(this.search, this.categorys, this.range)
      .subscribe(
        (res) => {
          this.products = res;
          this.getMaxRange();
          if (this.products.length == 0) {
            this.alert.show = true;
          } else {
            this.alert.show = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //get max range
  getMaxRange() {
    this.products.forEach((product) => {
      if (product.price > this.maxRange) {
        this.maxRange = product.price;
      }
    });
  }
}
