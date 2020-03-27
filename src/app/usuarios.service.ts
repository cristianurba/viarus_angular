import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3000/api/usuarios';
  }

  getUserbyId(userId) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'user-token': localStorage.getItem('user-token') })
    };

    return this.httpClient.get(`${this.baseUrl}`, httpOptions).toPromise();

  }

  registro(formValues) {
    return this.httpClient.post(`${this.baseUrl}/register`, formValues).toPromise();
  }

  login(formValues) {
    return this.httpClient.post(`${this.baseUrl}/login`, formValues).toPromise();
  }

}
