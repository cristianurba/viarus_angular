import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/usuarios';
  }

  registro(formValues) {
    return this.httpClient.post(`${this.baseUrl}/register`, formValues).toPromise();
  }

  login(formValues) {
    return this.httpClient.post(`${this.baseUrl}/login`, formValues).toPromise();
  }

}
