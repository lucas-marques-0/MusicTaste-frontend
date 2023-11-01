import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
const bcrypt = require('bcrypt')

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  constructor(private router: Router, private cadastroService: CadastroService) { }

  email: string = '';
  senha: string = '';
  
  cadastroInvalido: boolean = false;
  nomeUsuarioJaExiste: boolean = false;
  nomeUsuarioComEspacos: boolean = false;

  async onSubmit() {
    if (!this.email || !this.senha) {
      this.resetarValores();
      this.avisarCadastroInvalido();
    } else {
      if(this.email.trim().includes(' ')) {
        this.email = '';
        this.avisarNomeUsuarioComEspacos();
      } else {
        if(await this.cadastroService.verificarUsuarioExistente(this.email)) {
          this.avisarNomeUsuarioJaExiste()
        } else {
          //const hashedPassword = await this.cadastroService.hashPassword(this.password);
          const senhaCriptografada = bcrypt.hashSync(this.senha, 10)
          console.log(senhaCriptografada)
          await this.cadastroService.adicionarUsuario(this.email.trim(), senhaCriptografada);
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
