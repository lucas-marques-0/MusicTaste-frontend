import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
const bcrypt = require('bcrypt');


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  constructor(private router: Router, private cadastroService: CadastroService) { }

  username: string = '';
  password: string = '';
  
  cadastroInvalido: boolean = false;
  nomeUsuarioJaExiste: boolean = false;
  nomeUsuarioComEspacos: boolean = false;

  async onSubmit() {
    if (!this.username || !this.password) {
      this.resetarValores();
      this.avisarCadastroInvalido();
    } else {
      if(this.username.trim().includes(' ')) {
        this.username = '';
        this.avisarNomeUsuarioComEspacos();
      } else {
        if(await this.verificarNomeUsuarioJaExiste()) {
          this.avisarNomeUsuarioJaExiste()
        } else {
          const hashedPassword = await this.criptografarSenha(this.password);
          await this.cadastroService.adicionarUsuario(this.username.trim(), hashedPassword);
          this.resetarValores();
          this.router.navigate(['/']);
        }
      }
    }
  }

  async criptografarSenha(password: string): Promise<string> {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err: any, hash: any) => {
        if (err) {
          console.error('Erro ao criar o hash da senha:', err);
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  async verificarNomeUsuarioJaExiste() {
    const usuarios = await this.cadastroService.buscarUsuarios();
    const usuariosIguais = usuarios.filter((usuario: any) => usuario.username == this.username)
    if(usuariosIguais.length > 0){
      return true
    } else {
      return false
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
    this.username = '';
    this.password = '';
  }

  telaLogin() {
    this.router.navigate(['/']);
  }
}
