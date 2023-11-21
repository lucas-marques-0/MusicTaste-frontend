import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AES } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  email: string = '';
  password: string = '';
  
  loginIncorreto: boolean = false;
  camposInvalidos: boolean = false;

  async onSubmit() {
    if (!this.email || !this.password) {
      this.resetarValores();
      this.avisarCamposInvalidos();
    } else {
      const usuarioEncontrado: any = this.loginService.verificarUsuarioExistente(this.email);
      if (usuarioEncontrado) {
        const senhaCorreta = bcrypt.compareSync(this.password, usuarioEncontrado.password);
        if (senhaCorreta) {
          this.criarToken(usuarioEncontrado);
        } else {
          this.avisarLoginIncorreto();
        }
        this.resetarValores();
        this.router.navigate(['/home']);
      } else {
        this.avisarLoginIncorreto();
      }
    }
  }

  criarToken(usuario: any) {
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'codigo-do-jwt', { expiresIn: '1d' });
    return { token, usuario }
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
    this.email = '';
    this.password = '';
  }

  telaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
