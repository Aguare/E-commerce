import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Alert } from "src/app/Models/Alert";
import { Product } from "src/app/Models/Product";
import { User } from "src/app/Models/User";
import { ConsultsService } from "src/app/Services/consults.service";
import { StorageService } from "src/app/Services/storage.service";

@Component({
  selector: "app-register-product",
  templateUrl: "./register-product.component.html",
  styleUrls: ["./register-product.component.scss"],
})
export class RegisterProductComponent {
  alert: Alert = new Alert("", "", "", false, 0);
  fileUpload: File | null = null;
  registerForm: FormGroup = new FormGroup({});
  isUpdate: Boolean = false;
  product: Product = new Product(
    "",
    this.storage.getUser(),
    "",
    "",
    0,
    0,
    1,
    "",
    new Date()
  );

  constructor(
    private fb: FormBuilder,
    private consult: ConsultsService,
    private route: ActivatedRoute,
    private storage: StorageService
  ) {
    this.generateForm();
    let tmp = this.route.snapshot.paramMap.get("id");
    if (tmp != null && tmp != "new") {
      this.consult.getProductById(tmp).subscribe(
        (res) => {
          this.product = res;
          this.isUpdate = true;
          this.registerForm.patchValue({
            name: this.product.name,
            description: this.product.description,
            price: this.product.price,
            stock: this.product.stock,
            category: this.product.category,
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

  getPath(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    let item = files?.item(0);
    if (item != null) {
      this.fileUpload = item;
    }
  }

  generateForm() {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      image: [],
      price: [
        "",
        [Validators.required, Validators.min(1), Validators.max(999999999999)],
      ],
      stock: [
        "",
        [Validators.required, Validators.min(1), Validators.max(999999999999)],
      ],
      category: ["Tecnología", [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get("image")?.setValue(file);
    }
  }

  register() {
    const fileInput = this.registerForm.get("image")?.value;
    if (this.registerForm.valid) {
      this.product.name = this.registerForm.value.name;
      this.product.description = this.registerForm.value.description;
      this.product.price = this.registerForm.value.price;
      this.product.stock = this.registerForm.value.stock;
      this.product.category = this.registerForm.get("category")?.value;
      if (this.isUpdate) {
        if (fileInput != "") {
          const formData = new FormData();
          formData.append("image", fileInput);
          this.consult.uploadImage(formData).subscribe(
            (res) => {
              this.product.image = res.message;
            },
            (err) => {
              this.alert = err;
            }
          );
        }
        this.consult.updateProduct(this.product).subscribe(
          (res) => {
            this.alert = new Alert(
              "Exito",
              "El producto se actualizo correctamente",
              "success",
              true,
              0
            );
          },
          (err) => {
            console.log(err);
            this.alert = new Alert(
              "Error",
              "El producto no se pudo actualizar",
              "danger",
              true,
              0
            );
          }
        );
      } else {
        delete this.product._id;
        const formData = new FormData();
        if (this.fileUpload != null) {
          formData.append("image", this.fileUpload);
        }
        this.consult.uploadImage(formData).subscribe(
          (res) => {
            this.product.image = res.message;
            this.consult.registerProduct(this.product).subscribe(
              (res) => {
                this.alert = res;
              },
              (err) => {
                this.alert = err;
              }
            );
          },
          (err) => {
            this.alert = err;
          }
        );
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
}
