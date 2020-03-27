import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registro: FormGroup;
  errores: any[];
  router: Router;

  imagenSeleccionada: string;

  constructor(private usuariosService: UsuariosService) {
    this.imagenSeleccionada = '7d92ybd.png';
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

      ]),
      image: new FormControl('7d92ybd.png', [
        Validators.required,

      ])
    }, [this.passwordValidator]);

    this.errores = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    this.usuariosService.registro(this.registro.value)
      .then(response => {
        localStorage.setItem('user-token', response['token']);
        this.router.navigate(['/home']);
        console.log(response);

      })
      .catch(err => {
        this.errores = err.error;
      });

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

  handleChange($event) {

    console.log($event.target.value);

    this.imagenSeleccionada = $event.target.value;
  }

}
