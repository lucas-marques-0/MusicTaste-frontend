import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';

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
          const hashedPassword = await this.cadastroService.hashPassword(this.password);
          await this.cadastroService.adicionarUsuario(this.username.trim(), hashedPassword);
          this.resetarValores();
          this.router.navigate(['/']);
        }
      }
    }
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
