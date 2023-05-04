import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/Models/Alert';
import { Order } from 'src/app/Models/Order';
import { Product } from 'src/app/Models/Product';
import { User } from 'src/app/Models/User';
import { ConsultsService } from 'src/app/Services/consults.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ProductOrder } from 'src/app/Models/ProductOrder';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent {
  alert: Alert = new Alert('asd', 'asd', 'danger', true, 0);
  product: Product = new Product(
    '',
    this.storage.getUser(),
    '',
    '',
    0,
    0,
    3,
    '',
    new Date()
  );

  constructor(
    private consult: ConsultsService,
    private storage: StorageService,
    private route: ActivatedRoute
  ) {
    let tmp = this.route.snapshot.paramMap.get('id');
    if (tmp != null) {
      this.consult.getProductById(tmp).subscribe(
        (res) => {
          this.product = res;
        },
        (err) => {
          this.alert = new Alert(
            'Error',
            'No se pudo obtener el producto',
            'danger',
            true,
            3000
          );
        }
      );
    }
  }

  addToCart() {
    let cart: Order = this.storage.getCart();
    if (cart == null) {
      cart = new Order(
        '',
        this.storage.getUser(),
        [],
        '',
        '',
        '',
        0,
        new Date(),
        new Date(),
        new Date()
      );
      cart.products.push(new ProductOrder(this.product, 1));
      this.storage.saveCart(cart);
      this.alert = new Alert(
        'Agregado',
        'El producto se agregó al carrito',
        'success',
        true,
        0
      );
    } else {
      let products = cart.products;
      let exists = false;
      products.forEach((p) => {
        if (p.product._id == this.product._id) {
          exists = true;
        }
      });
      if (exists) {
        this.alert = new Alert(
          'Repetido',
          'El producto ya está en el carrito',
          'danger',
          true,
          0
        );
      } else {
        cart.products.push(new ProductOrder(this.product, 1));
        this.storage.saveCart(cart);
        this.alert = new Alert(
          'Agregado',
          'El producto se agregó al carrito',
          'success',
          true,
          0
        );
      }
    }
  }

  refresh() {
    window.location.reload();
  }
}
