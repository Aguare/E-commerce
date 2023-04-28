export class Alert {
  title: string;
  message: string;
  type: string;
  show: boolean;
  code: number;

  constructor(
    title: string,
    message: string,
    type: string,
    show: boolean,
    code: number
  ) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.show = show;
    this.code = code;
  }
}
