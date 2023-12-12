import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';
import * as crypto from 'crypto-js'
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  constructor(private router: Router, private cadastroService: CadastroService) { }

  username: string = '';
  email: string = '';
  password: string = '';
  
  cadastroInvalido: boolean = false;
  nomeUsuarioJaExiste: boolean = false;
  emailUsuarioJaExiste: boolean = false;
  nomeUsuarioComEspacos: boolean = false;

  async onSubmit() {
    if (!this.email || !this.password || !this.username) {
      this.exibirSwal('Erro!', 'error', 'Porfavor, preencha todos os campos :/');
      this.resetarValores();
    } else {
      if(this.username.trim().includes(' ')) {
        this.exibirSwal('Erro!', 'error', 'Espaços não são permitidos no nome do usuário :/');
        this.username = '';
      } else {
        const usuariosCadastrados = await this.cadastroService.buscarUsuarios();
        const usernameExistente = usuariosCadastrados.find((user: any) => this.username === user.username);
        const emailExistente = usuariosCadastrados.find((user: any) => this.email === user.email);
        if(usernameExistente) {
          this.exibirSwal('Erro!', 'error', 'O nome do usuário digitado já está em uso. Por favor, escolha um diferente :/');
        } else {
          if(emailExistente) {
            this.exibirSwal('Erro!', 'error', 'O email já está cadastrado, clique em "logar" para continuar.');
          } else {
            const senhaCriptografada = crypto.SHA256(this.password).toString(crypto.enc.Hex)
            this.cadastroService.adicionarUsuario(this.username, this.email.trim(), senhaCriptografada).then((usuarioAdicionado) => {
              this.exibirSwal('Cadastro concluído!', 'success', 'Seu cadastro foi realizado com sucesso.');
              this.resetarValores();
              this.router.navigate(['/']);
            }).catch((erro) => {
              this.exibirSwal('Erro!', 'error', 'Infelizmente ocorreu um erro ao cadastrar o usuário :/');
            })
          }
        }
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

  resetarValores() {
    this.email = '';
    this.password = '';
  }

  telaLogin() {
    this.router.navigate(['/']);
  }
}
