import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { ConsultsService } from 'src/app/Services/consults.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  @Input() product: Product | null = null;
  allowed: number = 3;

  constructor(private consult: ConsultsService) {}

  transformDate(date: any): any {
    const newDate = new Date(date);
    const datePipe = new DatePipe('en-US');
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    let test = datePipe.transform(newDate, 'dd/MM/yyyy');
    return test;
  }

  updateStatus(event: any) {
    this.allowed = event.target.value;
    if (this.product != null) {
      this.product.allowed = this.allowed;
    }
  }

  updateAllowed() {
    if (this.product) {
      this.consult.updateProduct(this.product).subscribe((res) => {
        window.location.reload();
      });
    }
  }
}
