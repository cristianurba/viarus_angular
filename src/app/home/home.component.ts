import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../mensaje.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mensaje: any;
  mensajes: Array<[]>;
  userId: any;

  constructor(private mensajeService: MensajeService, private router: Router) {
    this.mensaje = {};
  }

  ngOnInit() {
    this.recuperarMensajes();
    this.userId = localStorage.getItem('userId');
  }

  recuperarMensajes() {
    this.mensajeService.getAll()
      .then(response => {
        if (response.error) {
          this.router.navigate(['/login']);
        }
        this.mensajes = response;
      })
      .catch(err => {
        console.log(err);
        /* this.router.navigate(['/login']); */
        this.mensajes = [];
      });
  }

  buscarMensajes() {
    this.mensajeService.find(this.mensaje)
      .then(response => {
        console.log('FUNCION', response);
        this.mensajes = response;
        this.mensaje.busqueda = '';
      })
      .catch(err => {
        console.log('ERROR FUNCION', err);
        this.mensajes = [];
      });
  }

  enviarMensaje() {

    /* console.log(this.mensaje); */
    this.mensajeService.escribirMensaje(this.mensaje)
      .then(response => {
        this.mensaje = {};
        this.recuperarMensajes();
      })
      .catch(err => {
        console.log(err);
      });
  }

  borrarMensaje(mensaje) {
    const mensajeId = mensaje.id;
    this.mensajeService.deleteById(mensajeId)
      .then(response => {
        /* alert([response]); */
        if (confirm('¿Estás seguro de querer borrar el mensaje?')) {
          this.recuperarMensajes();
        } else {
          return null;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  editMensaje(mensaje) {
    console.log(mensaje);
  }

  logout(): void {
    if (confirm('¿Estás seguro de querer salir de Viarus?')) {
      localStorage.removeItem('user-token');
      localStorage.removeItem('userId');
      this.router.navigate(['/landing']);
    } else {
      return null;
    }
  }

}
