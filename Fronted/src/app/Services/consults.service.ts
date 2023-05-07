import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../Models/User";
import { Alert } from "../Models/Alert";
import { Product } from "../Models/Product";
import { Departament } from "../Models/Departament";
import { Card } from "../Models/Card";
import { Order } from "../Models/Order";

@Injectable({
  providedIn: "root",
})
export class ConsultsService {
  private BACK = "http://localhost:3000/";
  private BACK_USER = "http://localhost:3000/user/";
  private BACK_PRODUCT = "http://localhost:3000/product/";
  private BACK_ORDER = "http://localhost:3000/order/";
  private BACK_ADMIN = "http://localhost:3000/admin/";

  constructor(private connection: HttpClient) {}

  getDepartaments(): Observable<Departament[]> {
    return this.connection.get<Departament[]>(this.BACK + "getDepartaments");
  }

  //USERS
  validateUser(user: User): Observable<User> {
    return this.connection.post<User>(this.BACK_USER + "login", user);
  }

  registerUser(user: User): Observable<Alert> {
    return this.connection.post<Alert>(this.BACK_USER + "add", user);
  }

  getAllEmployees(): Observable<User[]> {
    return this.connection.get<User[]>(this.BACK_USER + "listEmployees");
  }

  getUserById(id: string): Observable<User> {
    return this.connection.get<User>(this.BACK_USER + "get/" + id);
  }

  updateUser(user: User): Observable<Alert> {
    return this.connection.put<Alert>(this.BACK_USER + "update", user);
  }

  //PRODUCTS
  getProductById(id: string): Observable<Product> {
    return this.connection.get<Product>(this.BACK_PRODUCT + "get/" + id);
  }

  updateProduct(product: Product): Observable<Alert> {
    return this.connection.put<Alert>(this.BACK_PRODUCT + "update", product);
  }

  registerProduct(product: Product): Observable<Alert> {
    return this.connection.post<Alert>(this.BACK_PRODUCT + "add", product);
  }

  uploadImage(formData: FormData): Observable<Alert> {
    return this.connection.post<Alert>(this.BACK + "upload", formData);
  }

  getAllProductsByUser(id: string): Observable<Product[]> {
    return this.connection.get<Product[]>(
      this.BACK_PRODUCT + "allProductsByUser/" + id
    );
  }

  getAllProductsByStatusPending(): Observable<Product[]> {
    return this.connection.get<Product[]>(
      this.BACK_PRODUCT + "allProductsByStatusPending"
    );
  }

  getCarouselProducts(): Observable<Product[]> {
    return this.connection.get<Product[]>(
      this.BACK_PRODUCT + "getCarouselProducts"
    );
  }

  //CARDS
  getAllCardsByUser(id: string): Observable<Card[]> {
    return this.connection.get<Card[]>(
      this.BACK_ORDER + "allCardsByUser/" + id
    );
  }

  registerCard(card: Card): Observable<Card> {
    return this.connection.post<Card>(this.BACK_ORDER + "addCard", card);
  }

  //ORDERS
  registerOrder(order: Order): Observable<Alert> {
    return this.connection.post<Alert>(this.BACK_ORDER + "addOrder", order);
  }

  getAllOrdersByUser(id: string): Observable<Order[]> {
    return this.connection.get<Order[]>(
      this.BACK_ORDER + "getOrdersByUser/" + id
    );
  }

  getOrderById(id: string): Observable<Order> {
    return this.connection.get<Order>(this.BACK_ORDER + "getOrderById/" + id);
  }

  cancelOrder(id: string): Observable<Alert> {
    return this.connection.get<Alert>(this.BACK_ORDER + "cancelOrder/" + id);
  }

  getAllOrdersInProcess(): Observable<Order[]> {
    return this.connection.get<Order[]>(
      this.BACK_ORDER + "getAllOrderOnProcess"
    );
  }

  updateOrder(order: Order): Observable<Alert> {
    return this.connection.put<Alert>(this.BACK_ORDER + "updateOrder", order);
  }

  //REPORTS
  getReport1All(): Observable<any[]> {
    return this.connection.get<any[]>(this.BACK_ADMIN + "report1all");
  }

  getReport1IntervalTime(dateInit: string, dateEnd: string): Observable<any[]> {
    return this.connection.get<any[]>(
      this.BACK_ADMIN + "report1/" + dateInit + "/" + dateEnd
    );
  }

  getReport2All(): Observable<any[]> {
    return this.connection.get<any[]>(this.BACK_ADMIN + "report2all");
  }

  getReport2IntervalTime(dateInit: string, dateEnd: string): Observable<any[]> {
    return this.connection.get<any[]>(
      this.BACK_ADMIN + "report2/" + dateInit + "/" + dateEnd
    );
  }

  getReport3All(): Observable<any[]> {
    return this.connection.get<any[]>(this.BACK_ADMIN + "report3all");
  }

  getReport3IntervalTime(dateInit: string, dateEnd: string): Observable<any[]> {
    return this.connection.get<any[]>(
      this.BACK_ADMIN + "report3/" + dateInit + "/" + dateEnd
    );
  }

  getReport4All(): Observable<any[]> {
    return this.connection.get<any[]>(this.BACK_ADMIN + "report4all");
  }

  getReport4IntervalTime(dateInit: string, dateEnd: string): Observable<any[]> {
    return this.connection.get<any[]>(
      this.BACK_ADMIN + "report4/" + dateInit + "/" + dateEnd
    );
  }

  getReport5(): Observable<any[]> {
    return this.connection.get<any[]>(this.BACK_ADMIN + "report5");
  }
}
