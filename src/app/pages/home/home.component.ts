import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../login/home.service';
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
    if(localStorage.getItem('token') && localStorage.getItem('userID')) {
      await this.buscarUsuarios()
      this.isLoading = false
    } else {
      await this.router.navigate(['/'])
    }
  }

  filtrarUsuarios(query: string) {
    console.log(query)
    if (query !== '') {
      this.usuariosFiltrados = this.usuarios.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      this.usuarioNaoEncontrado = this.usuariosFiltrados.length === 0;
    } else {
      this.usuariosFiltrados = [];
      this.usuarioNaoEncontrado = false;
    }
  }

  resetarFiltro() {
    this.usuariosFiltrados = this.usuarios;
    this.usuarioNaoEncontrado = false;
  }

  async buscarUsuarios() {
    const listaUsuarios = await this.homeService.buscarUsuarios();
    this.usuarios = listaUsuarios.filter((usuario: any) => usuario.id !== localStorage.getItem('userID'));
  }

  verPerfil(usuario: any) {
    this.router.navigate(['/verPerfil/', usuario.id]);
  }
}
