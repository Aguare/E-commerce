import { User } from "./User";

export class Product {
  _id?: string;
  name: string;
  user_seller?: User;
  description: string;
  image: string;
  price: number;
  stock: number;
  allowed: number;
  category: string;
  createdAt?: Date;

  constructor(
    name: string,
    user_seller: User,
    description: string,
    image: string,
    price: number,
    stock: number,
    allowed: number,
    categorys: string,
    createdAt: Date
  ) {
    this.name = name;
    this.user_seller = user_seller;
    this.description = description;
    this.image = image;
    this.price = price;
    this.stock = stock;
    this.allowed = allowed;
    this.category = categorys;
    this.createdAt = createdAt;
  }
}
