import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registro: FormGroup;

  constructor() {
    this.registro = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,12}$/)
      ]),
      repite_password: new FormControl('', [
        Validators.required,

      ])
    }, [this.passwordValidator]);
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.registro.value)
  }

  passwordValidator(form) {
    const passwordValue = form.controls.password.value;
    const repitePasswordValue = form.controls.repite_password.value;

    if (passwordValue === repitePasswordValue) {
      return null;
    } else {
      return { passwordvalidator: { msg: 'Las contraseñas no coinciden' } };
    }
  }

}
