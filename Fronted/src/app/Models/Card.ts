import { User } from "./User";

export class Card {
  _id?: string;
  number: number;
  owner: User;
  name: string;
  cvv: number;
  expiration_mont: number;
  expiration_year: number;

  constructor(
    _id: string,
    number: number,
    owner: User,
    name: string,
    cvv: number,
    expiration_mont: number,
    expiration_year: number
  ) {
    this._id = _id;
    this.number = number;
    this.owner = owner;
    this.cvv = cvv;
    this.name = name;
    this.expiration_mont = expiration_mont;
    this.expiration_year = expiration_year;
  }
}
