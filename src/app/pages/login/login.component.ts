import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import * as CryptoJS from 'crypto-js';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  email: string = '';
  password: string = '';

  camposPreenchidos: boolean = false;
  emailIncorreto: boolean = false;
  senhaIncorreta: boolean = false;
  camposInvalidos: boolean = false;

  async onSubmit() {
    if (!this.validarEmail(this.email)) {
      this.exibirSwal('Erro!', 'error', 'O formato do email digitado não é válido, porfavor verifique :/');
    } else {
      const usuarioEncontrado: any = await this.loginService.verificarUsuarioExistente(this.email);
      if (usuarioEncontrado) {
        const login = await this.loginService.logarUsuario(usuarioEncontrado.id, CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex));
        if (!login) {
          this.exibirSwal('Erro!', 'error', 'Senha incorreta :/');
        } else {
          localStorage.setItem('token', login.token);
          localStorage.setItem('userID', usuarioEncontrado.id);
          this.resetarValores();
          this.router.navigate(['/home']);
        }
      } else {
        this.exibirSwal('Erro!', 'error', 'Não achamos nenhum usuário com esse email. Caso não tenha cadastro clique em "cadastro" abaixo.');
      }
    }
  }

  exibirSwal(titulo: string, icon: SweetAlertIcon | 'none' = 'success', texto: string): void {
    Swal.fire({
      title: titulo,
      icon: icon === 'none' ? undefined : icon,
      text: texto,
    });
  }

  validarEmail(email: any) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  isButtonDisabled(): boolean {
    return !(this.email && this.password);
  }

  resetarValores() {
    this.email = '';
    this.password = '';
  }

  telaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}
