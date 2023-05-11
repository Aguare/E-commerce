export class User {
  _id?: string;
  username: string;
  password: string;
  names: string;
  last_names: string;
  date_birth: Date;
  phone: string;
  type: string;

  constructor(
    _id: string,
    username: string,
    password: string,
    names: string,
    last_names: string,
    date_birth: Date,
    phone: string,
    type: string
  ) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.names = names;
    this.last_names = last_names;
    this.date_birth = date_birth;
    this.phone = phone;
    this.type = type;
  }
}
