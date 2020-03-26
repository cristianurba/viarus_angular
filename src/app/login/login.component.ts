import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.login = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.usuariosService.login(this.login.value).
      then(response => {
        /* console.log(response['token']); */
        localStorage.setItem('user-token', response['token']);
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err);

      });
  }

}
