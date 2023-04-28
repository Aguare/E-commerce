import { User } from "./User";

export class Product {
  _id?: string;
  name: string;
  user_seller?: User;
  user_seller_id?: string;
  description: string;
  image?: string;
  price: number;
  stock: number;
  allowed: boolean;
  category: string;

  constructor(
    name: string,
    user_seller: User,
    user_seller_id: string,
    description: string,
    image: string,
    price: number,
    stock: number,
    allowed: boolean,
    categorys: string
  ) {
    this.name = name;
    this.user_seller = user_seller;
    this.user_seller_id = user_seller_id;
    this.description = description;
    this.image = image;
    this.price = price;
    this.stock = stock;
    this.allowed = allowed;
    this.category = categorys;
  }
}
