import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Alert } from "src/app/Models/Alert";
import { User } from "src/app/Models/User";
import { ConsultsService } from "src/app/Services/consults.service";
import moment from "moment-es6";

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.scss"],
})
export class RegisterUserComponent {
  alert: Alert = new Alert("", "", "", false, 0);
  registerForm: FormGroup = new FormGroup({});
  user: User = new User("", "", "", "", "", new Date(), "", "");
  isUpdate: Boolean = false;
  @Input() isCommon: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private consult: ConsultsService,
    private route: ActivatedRoute
  ) {
    this.generateForm();
    let tmp = this.route.snapshot.paramMap.get("id");
    if (tmp != null && tmp != "new") {
      this.consult.getUserById(tmp).subscribe(
        (res) => {
          this.user = res;
          this.isUpdate = true;
          const dateFormat = moment(this.user.date_birth).format("YYYY-MM-DD");
          this.registerForm.patchValue({
            username: this.user.username,
            names: this.user.names,
            password: this.user.password,
            password2: this.user.password,
            last_names: this.user.last_names,
            date_birth: dateFormat,
            phone: this.user.phone,
            type: this.user.type,
          });
        },
        (err) => {
          this.alert = new Alert(
            "Error",
            "El usuario no existe",
            "danger",
            true,
            0
          );
        }
      );
    }
  }

  generateForm() {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      password2: [""],
      names: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      last_names: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      date_birth: ["", [Validators.required]],
      phone: [
        "",
        [
          Validators.required,
          Validators.min(100000),
          Validators.maxLength(999999999999),
        ],
      ],
      type: ["Admin", [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      if (this.validatePasswords()) {
        this.user.username = this.registerForm.value.username;
        this.user.password = this.registerForm.value.password;
        this.user.names = this.registerForm.value.names;
        this.user.last_names = this.registerForm.value.last_names;
        this.user.date_birth = new Date(this.registerForm.value.date_birth);
        this.user.phone = this.registerForm.value.phone;
        if (this.isCommon) {
          this.user.type = "Common";
        } else {
          this.user.type = this.registerForm.value.type;
        }
        if (this.isUpdate) {
          this.consult.updateUser(this.user).subscribe(
            (res) => {
              this.alert = res;
              this.registerForm.reset();
            },
            (err) => {
              this.alert = err.error;
            }
          );
        } else {
          delete this.user._id;
          this.consult.registerUser(this.user).subscribe(
            (res) => {
              this.alert = res;
              this.registerForm.reset();
            },
            (err) => {
              this.alert = err.error;
            }
          );
        }
      }
    } else {
      this.alert = new Alert(
        "Error",
        "Debe llenar todos los campos correctamente",
        "danger",
        true,
        0
      );
    }
  }

  validatePasswords() {
    if (this.registerForm.value.password != this.registerForm.value.password2) {
      this.alert = new Alert(
        "Error",
        "Las contraseñas no coinciden",
        "danger",
        true,
        0
      );
      return false;
    }
    return true;
  }
}
