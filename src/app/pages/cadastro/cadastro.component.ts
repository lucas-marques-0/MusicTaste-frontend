import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
import * as crypto from 'crypto-js'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  constructor(private router: Router, private cadastroService: CadastroService) { }

  user: string = '';
  email: string = '';
  password: string = '';
  
  cadastroInvalido: boolean = false;
  nomeUsuarioJaExiste: boolean = false;
  nomeUsuarioComEspacos: boolean = false;

  async onSubmit() {
    if (!this.email || !this.password || !this.user) {
      this.resetarValores();
      this.avisarCadastroInvalido();
    } else {
      if(this.user.trim().includes(' ')) {
        this.user = '';
        this.avisarNomeUsuarioComEspacos();
      } else {
        if(await this.cadastroService.verificarUsuarioExistente(this.email)) {
          this.avisarNomeUsuarioJaExiste()
        } else {
          const senhaCriptografada = crypto.SHA256(this.password).toString(crypto.enc.Hex)
          await this.cadastroService.adicionarUsuario(this.user, this.email.trim(), senhaCriptografada);
          this.resetarValores();
          this.router.navigate(['/']);
        }
      }
    }
  }

  avisarNomeUsuarioComEspacos() {
    this.nomeUsuarioComEspacos = true;
    setTimeout(() => {
      this.nomeUsuarioComEspacos = false;
    }, 3000);
  }

  avisarNomeUsuarioJaExiste() {
    this.nomeUsuarioJaExiste = true;
    setTimeout(() => {
      this.nomeUsuarioJaExiste = false;
    }, 3000);
  }

  avisarCadastroInvalido() {
    this.cadastroInvalido = true;
    setTimeout(() => {
      this.cadastroInvalido = false;
    }, 3000);
  }

  resetarValores() {
    this.email = '';
    this.password = '';
  }

  telaLogin() {
    this.router.navigate(['/']);
  }
}
