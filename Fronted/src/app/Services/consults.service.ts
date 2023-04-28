import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../Models/User";
import { Alert } from "../Models/Alert";
import { Product } from "../Models/Product";

@Injectable({
  providedIn: "root",
})
export class ConsultsService {
  private BACK = "http://localhost:3000/";
  private BACK_USER = "http://localhost:3000/user/";
  private BACK_PRODUCT = "http://localhost:3000/product/";

  constructor(private connection: HttpClient) {}

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
}
