import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private homeService: HomeService) { }

  usuarios: any[] = []
  usuariosFiltrados: any[] = [];
  avatar: any
  usuarioNaoEncontrado: boolean = false
  isLoading: boolean = true

  async ngOnInit() {
    await this.buscarUsuarios()
    this.isLoading = false
  }

  filtrarUsuarios(query: string) {
    if (query) {
      if (this.usuarioNaoEncontrado = true) {
        this.usuarioNaoEncontrado = false
      }
      this.usuariosFiltrados = this.usuarios.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      if(this.usuariosFiltrados.length == 0) {
        this.usuarioNaoEncontrado = true
      }
    } else {
      this.usuariosFiltrados = [];
    }
  }

  async buscarUsuarios() {
    const listaUsuarios = await this.homeService.buscarUsuarios();
    this.usuarios = listaUsuarios.filter((usuario: any) => usuario.id !== localStorage.getItem('userID'));
  }

  async resetarListaUsuarios() {
    this.usuarioNaoEncontrado = false
  }

  verPerfil(usuario: any) {
    this.router.navigate(['/verPerfil/', usuario.id]);
  }
}
