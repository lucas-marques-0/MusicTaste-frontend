import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { VerPerfilService } from './ver-perfil.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent {
  constructor(private route: ActivatedRoute, private router: Router, private verPerfilService: VerPerfilService, private sanitizer: DomSanitizer) { }

  userID: any = '';
  usuarioInfos: any = [];
  musicasUsuario: any = [];
  textosMusicas: any = [
    'Música do momento.',
    'Música favorita do seu artista favorito.',
    'Música antiga que você ainda escuta. ',
    'Música com melhor letra.',
    'Música que quase ninguém conhece.',
    'Música que mais mudou sua visão e perspectiva.',
    'Música que cresceu escutando.',
    'Música mais diferente que já escutou.',
    'Música que transmite mais sentimentos.',
    'Música preferida pro alto falante.'
  ];
  isLoading: boolean = true

  async ngOnInit() {
    const token: any = localStorage.getItem('token')
    //const tokenValido = await this.verPerfilService.buscarDadosVerPerfil(token);
    if(token) {
      this.userID = this.route.snapshot.paramMap.get('id')
      await this.buscarInfosUsuario(this.userID);
      this.isLoading = false
    } else {
      await this.router.navigate(['/']);
      console.log('usuario não habilitado')
    }
  }

  async buscarInfosUsuario(userID: any) {
    let userInfos = await this.verPerfilService.buscarInfosUsuario(userID);    
    this.usuarioInfos = userInfos[0]     
    this.musicasUsuario = this.usuarioInfos.musicas
  }

  mostrarMusica(musicaUrl: any) {
    if(musicaUrl.includes('intl-pt')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(musicaUrl.replace('intl-pt', 'embed'))
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(musicaUrl.replace('/track/', '/embed/track/'));
    }
  }

}
