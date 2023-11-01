import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  username: string = '';
  password: string = '';
  
  loginIncorreto: boolean = false;
  camposInvalidos: boolean = false;

  async onSubmit() {
    if (!this.username || !this.password) {
      this.resetarValores();
      this.avisarCamposInvalidos();
    } else {
      const isAuthenticated = await this.loginService.verifyPassword(this.username, this.password);
      if (isAuthenticated) {
        this.resetarValores();
        this.router.navigate(['/home']);
      } else {
        this.avisarLoginIncorreto();
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

  avisarLoginIncorreto() {
    this.loginIncorreto = true;
    setTimeout(() => {
      this.loginIncorreto = false;
    }, 3000);
  }

  avisarCamposInvalidos() {
    this.camposInvalidos = true;
    setTimeout(() => {
      this.camposInvalidos = false;
    }, 3000);
  }

  resetarValores() {
    this.username = '';
    this.password = '';
  }

  telaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
