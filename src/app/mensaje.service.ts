import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/mensajes';
  }

  escribirMensaje(mensaje) {
    const httpOptions = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
      })
    };
    return this.httpClient.post(`${this.baseUrl}/new`, mensaje, httpOptions).toPromise();

  }

  deleteById(mensaje) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id: mensaje }
    };
    return this.httpClient.delete(`${this.baseUrl}`, httpOptions).toPromise();

  }

  getAll(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'user-token': localStorage.getItem('user-token'),
      })
    };
    return this.httpClient.get(`${this.baseUrl}`, httpOptions).toPromise();
  }
}
