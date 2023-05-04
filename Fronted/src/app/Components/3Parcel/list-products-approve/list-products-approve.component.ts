import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ConsultsService } from 'src/app/Services/consults.service';

@Component({
  selector: 'app-list-products-approve',
  templateUrl: './list-products-approve.component.html',
  styleUrls: ['./list-products-approve.component.scss'],
})
export class ListProductsApproveComponent {
  products: Product[] = [];
  selectedProduct = this.products[0];

  constructor(private consults: ConsultsService) {
    this.consults.getAllProductsByStatusPending().subscribe((data) => {
      this.products = data;
      this.selectedProduct = this.products[0];
    });
  }

  transformDate(date: any): any {
    const newDate = new Date(date);
    const datePipe = new DatePipe('en-US');
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    let test = datePipe.transform(newDate, 'dd/MM/yyyy');
    return test;
  }

  changeEdit(p: Product) {
    this.selectedProduct = p;
  }
}
