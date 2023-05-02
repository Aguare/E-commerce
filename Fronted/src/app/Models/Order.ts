import { User } from "./User";
import { ProductOrder } from "./ProductOrder";

export class Order {
  _id?: string;
  user_client: User;
  products: ProductOrder[];
  status?: string;
  address: string;
  card: string;
  total: number;
  date_delivered: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    _id: string,
    user_client: User,
    products: ProductOrder[],
    status: string,
    address: string,
    card: string,
    total: number,
    date_delivered: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = _id;
    this.user_client = user_client;
    this.products = products;
    this.status = status;
    this.address = address;
    this.card = card;
    this.total = total;
    this.date_delivered = date_delivered;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
