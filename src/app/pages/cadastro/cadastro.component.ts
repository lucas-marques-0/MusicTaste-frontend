import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  constructor(private router: Router, private cadastroService: CadastroService) { }

  usuario: string = '';
  email: string = '';
  senha: string = '';
  
  cadastroInvalido: boolean = false;
  nomeUsuarioJaExiste: boolean = false;
  nomeUsuarioComEspacos: boolean = false;

  async onSubmit() {
    if (!this.email || !this.senha || !this.usuario) {
      this.resetarValores();
      this.avisarCadastroInvalido();
    } else {
      if(this.usuario.trim().includes(' ')) {
        this.usuario = '';
        this.avisarNomeUsuarioComEspacos();
      } else {
        if(await this.cadastroService.verificarUsuarioExistente(this.email)) {
          this.avisarNomeUsuarioJaExiste()
        } else {
          const senhaCriptografada = bcrypt.hashSync(this.senha, 10)
          await this.cadastroService.adicionarUsuario(this.usuario, this.email.trim(), senhaCriptografada);
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
    this.senha = '';
  }

  telaLogin() {
    this.router.navigate(['/']);
  }
}
