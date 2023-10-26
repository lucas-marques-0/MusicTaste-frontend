import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  @Output() searchEvent = new EventEmitter<string>();
  @Input() layout: string = '1';

  usuarioPesquisado: string = '';

  pesquisarUsuario() {
    if (this.usuarioPesquisado.trim() !== '') {
      this.searchEvent.emit(this.usuarioPesquisado);
    }
    this.usuarioPesquisado = ''
  }

  telaEditarPerfil() {
    let userID = localStorage.getItem('userID')
    this.router.navigate(['/editarUsuario/', userID]);
  }

  async telaHome() {
    await this.router.navigate(['/home']);
    location.reload()
  }
}
