import { Component, OnInit } from '@angular/core';
import { Mensaje } from './models/mensaje';
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
        console.log(response);
        if (response.error) {
          this.router.navigate(['/login']);
        }
        this.mensajes = response;
      })
      .catch(err => {
        console.log(err);
        /* this.router.navigate(['/login']); */
        this.mensajes = [];
      })
  }

  enviarMensaje() {

    console.log(this.mensaje);
    this.mensajeService.escribirMensaje(this.mensaje)
      .then(response => {
        console.log(response);
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
        console.log(response);
        if (response.error) {
          this.router.navigate(['/login']);
        }
        this.recuperarMensajes();
      })
      .catch(err => {
        console.log(err);
      });
  }

  editMensaje(mensaje) {
    console.log(mensaje);
  }

}
