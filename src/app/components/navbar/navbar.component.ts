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
  @Output() buttonClickEvent = new EventEmitter<void>();
  @Input() layout: string = '1';

  usuarioPesquisado: string = '';

  pesquisarUsuario() {
    this.searchEvent.emit(this.usuarioPesquisado);
  }

  buttonClick() {
    this.usuarioPesquisado = '';
    this.buttonClickEvent.emit();
  }

  telaEditarPerfil() {
    let userID = localStorage.getItem('userID')
    this.router.navigate(['/editarUsuario/', userID]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  async telaHome() {
    await this.router.navigate(['/home']);
    location.reload()
  }
}
