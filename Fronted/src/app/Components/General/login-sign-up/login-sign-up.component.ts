import { Component } from "@angular/core";
import { Alert } from "src/app/Models/Alert";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/Models/User";
import { ConsultsService } from "src/app/Services/consults.service";
import { StorageService } from "src/app/Services/storage.service";
import { RedirectService } from "src/app/Services/redirect.service";

@Component({
  selector: "app-login-sign-up",
  templateUrl: "./login-sign-up.component.html",
  styleUrls: ["./login-sign-up.component.scss"],
})
export class LoginSignUpComponent {
  alert: Alert = new Alert("", "", "", false, 0);
  loginForm: FormGroup;
  user: User = new User("", "", "", "", "", new Date(), "", "");
  isLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private consult: ConsultsService,
    private storage: StorageService,
    private redirect: RedirectService
  ) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

  press1() {
    this.isLogin = true;
  }
  press2() {
    this.isLogin = false;
  }

  login() {
    if (this.loginForm.valid) {
      this.user.username = this.loginForm.value.username;
      this.user.password = this.loginForm.value.password;
      this.consult.validateUser(this.user).subscribe(
        (correct: any) => {
          if (correct._id != "") {
            this.storage.add(correct, "user");
            this.redirect.redirectLogin();
          } else {
            this.alert = correct;
          }
        },
        (error: any) => {
          this.alert = new Alert(
            "Error",
            "No hay conexión con el servidor",
            "danger",
            true,
            404
          );
        }
      );
    } else {
      this.alert = new Alert(
        "Error",
        "Los datos ingresados no son válidos",
        "danger",
        true,
        404
      );
    }
  }
}
