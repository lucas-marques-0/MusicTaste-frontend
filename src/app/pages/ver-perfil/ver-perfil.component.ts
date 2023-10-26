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
    this.userID = this.route.snapshot.paramMap.get('id')
    await this.buscarInfosUsuario(this.userID)
    this.isLoading = false
  }

  async buscarInfosUsuario(userID: any) {
    let userInfos = await this.verPerfilService.buscarInfosUsuario(userID);    
    this.usuarioInfos = userInfos[0]     
    this.musicasUsuario = this.usuarioInfos.musicas

    console.log(this.userID, this.usuarioInfos, this.musicasUsuario)
  }

  mostrarMusica(musicaUrl: any) {
    if(musicaUrl.includes('intl-pt')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(musicaUrl.replace('intl-pt', 'embed'))
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(musicaUrl.replace('/track/', '/embed/track/'));
    }
  }

}
