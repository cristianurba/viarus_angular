import { Component, OnInit } from '@angular/core';
import { Mensaje } from './models/mensaje';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mensaje: any;

  constructor() {
    this.mensaje = {};
  }

  ngOnInit() {
  }

  enviarMensaje() {
    console.log(this.mensaje);
  }

}
