import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  email: string = '';
  password: string = '';
  
  emailIncorreto: boolean = false;
  senhaIncorreta: boolean = false;
  camposInvalidos: boolean = false;

  async onSubmit() {
    if (!this.email || !this.password) {
      this.resetarValores();
      this.avisarCamposInvalidos();
    } else {
      const usuarioEncontrado: any = await this.loginService.verificarUsuarioExistente(this.email);
      if (usuarioEncontrado) {
        const login = await this.loginService.logarUsuario(usuarioEncontrado.id, CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex));
        if(login.token) {
          this.resetarValores();
          this.router.navigate(['/home']);
        }
      } else {
        this.avisarEmailIncorreto();
      }
    }
  }
 
  verificarLoginUsuario(usuarios: any[], username: string, password: string) {
    const usuarioEncontrado = usuarios.find((usuario) => usuario.username === username && usuario.password === password);
    if(usuarioEncontrado) {
      localStorage.setItem('userID', usuarioEncontrado.id);
      return true
    } else {
      return false
    }
  }

  avisarEmailIncorreto() {
    this.emailIncorreto = true;
    setTimeout(() => {
      this.emailIncorreto = false;
    }, 3000);
  }

  avisarSenhaIncorreta() {
    this.senhaIncorreta = true;
    setTimeout(() => {
      this.senhaIncorreta = false;
    }, 3000);
  }

  avisarCamposInvalidos() {
    this.camposInvalidos = true;
    setTimeout(() => {
      this.camposInvalidos = false;
    }, 3000);
  }

  resetarValores() {
    this.email = '';
    this.password = '';
  }

  telaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
