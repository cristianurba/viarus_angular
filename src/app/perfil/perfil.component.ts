import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  registro: FormGroup;
  errores: any[];
  /* userId: any; */
  usuario: any;

  imagenSeleccionada: string;

  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.registro = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      image: new FormControl('')
    });

    this.getUser();



    this.errores = [];
  }

  ngOnInit() {
    /* this.getUser(); */
  }

  getUser() {
    const userId = localStorage.getItem('userId');
    this.usuariosService.getUserbyId(userId)
      .then(response => {
        const user = response[0];
        this.imagenSeleccionada = user.image;
        this.registro = new FormGroup({
          name: new FormControl(user.name, [
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(3)
          ]),
          email: new FormControl(user.email, [
            Validators.required,
            Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
          ]),
          image: new FormControl('', [
            Validators.required,
          ]),
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit() {
    const userId = localStorage.getItem('userId');
    let datos = this.registro.value;
    datos.id = userId;
    console.log(datos);
    this.usuariosService.editUser(datos)
      .then(response => {
        this.router.navigate(['/home']);
        console.log(response);

      })
      .catch(err => {
        this.errores = err.error;
      });

  }

  /* passwordValidator(form) {
    const passwordValue = form.controls.password.value;
    const repitePasswordValue = form.controls.repite_password.value;

    if (passwordValue === repitePasswordValue) {
      return null;
    } else {
      return { passwordvalidator: { msg: 'Las contraseñas no coinciden' } };
    }
  } */

  handleChange($event) {

    console.log($event.target.value);

    this.imagenSeleccionada = $event.target.value;
  }


}
