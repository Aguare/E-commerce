import { User } from "./User";

export class Revenue {
  _id?: string;
  user_seller: User;
  user_client: User;
  revenue_seller: number;
  revenue_corporation: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    user_seller: User,
    user_client: User,
    revenue_seller: number,
    revenue_corporation: number,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.user_seller = user_seller;
    this.user_client = user_client;
    this.revenue_seller = revenue_seller;
    this.revenue_corporation = revenue_corporation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
