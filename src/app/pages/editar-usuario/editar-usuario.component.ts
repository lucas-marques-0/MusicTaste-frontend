import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditarUsuarioService } from './editar-usuario.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent {
  constructor(private route: ActivatedRoute, private router: Router, private editarUsuarioService: EditarUsuarioService, private sanitizer: DomSanitizer) { }

  userID: any = '';
  usuarioInfos: any = [];
  urlMusicaCard: any = [];
  musicasUsuario: any = [];
  textosMusicas: any = [
    'Música do momento.',
    'Música favorita do seu artista favorito.',
    'Música antiga que você ainda escuta. ',
    'Música com melhor letra.',
    'Música boa que quase ninguém conhece.',
    'Música que mais mudou sua visão e perspectiva.',
    'Música que cresceu escutando.',
    'Música mais diferente que já escutou.',
    'Música que transmite mais sentimentos.',
    'Música preferida pro alto falante.'
  ];
  temMusica: boolean = false;
  naoTemMusica: boolean = true;
  linksMusicas: any = new Array(10).fill('');
  linksMusicasAtualizadas: any = new Array(10).fill('');
  linkInvalido: boolean[] = new Array(10).fill(false);
  urlMusicaEmbed: { [key: string]: SafeResourceUrl } = {};
  usuarios: any = []
  isLoading: boolean = true
  
  async ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id')
    await this.buscarInfosUsuario(this.userID)
    this.isLoading = false
  }

  async buscarInfosUsuario(userID: any) {
    let userInfos = await this.editarUsuarioService.buscarInfosUsuario(userID);    
    this.usuarioInfos = userInfos[0]     
    this.musicasUsuario = this.usuarioInfos.musicas
  }

  colocarMusica(chave: string, acao: number) {
    const musica = this.musicasUsuario.find((musica: any) => musica.key === chave);
    if(acao == 1) {
      const value = this.linksMusicas[musica.key]
      if(this.verificarUrlSpotify(value)) {
        musica.value = value
        this.atualizarMusicas(this.userID, this.musicasUsuario)
        this.linksMusicas[musica.key] = ''
      } else {
        this.avisarLinkInvalido(chave)
        this.linksMusicas[musica.key] = ''
      }
    }
    if(acao == 2) {
      const value = this.linksMusicasAtualizadas[musica.key]
      const iframe = document.querySelector(`#iframe-${musica.key}`) as any;
      if(this.verificarUrlSpotify(value)) {
        musica.value = value
        iframe.src = value.replace('intl-pt', 'embed');
        this.atualizarMusicas(this.userID, this.musicasUsuario)
        this.linksMusicasAtualizadas[musica.key] = ''
      } else {
        this.avisarLinkInvalido(chave)
        this.linksMusicasAtualizadas[musica.key] = ''
      }
    }
  }

  /*verificarUrlSpotify(link: string): boolean {
    const regex = /^https:\/\/open\.spotify\.com\/intl-pt\/track\/([a-zA-Z0-9]{22})(\?.*)?$/;
    const match = link.match(regex);
    if (match && match[1].length === 22) {
      return true;
    } else {
      return false;
    }
  }*/

  verificarUrlSpotify(link: string): boolean {
    const regex = /^https:\/\/open\.spotify\.com\/(intl-pt\/)?track\/([a-zA-Z0-9]{22})(\?.*)?$/;
    const match = link.match(regex);
    if (match && match[2] && match[2].length === 22) {
      return true;
    } else {
      return false;
    }
  }

  avisarLinkInvalido(id: any) {
    this.linkInvalido[id] = true;
    setTimeout(() => {
      this.linkInvalido[id] = false;
    }, 3000);
  }

  async atualizarMusicas(userID: any, musicasUsuario: any) {
    await this.editarUsuarioService.atualizarMusicasUsuario(userID, musicasUsuario); 
  }

  mostrarMusica(keyMusica: any, linkMusica: any) {
    if (!this.urlMusicaEmbed[keyMusica]) {
      this.urlMusicaEmbed[keyMusica] = this.sanitizer.bypassSecurityTrustResourceUrl(linkMusica.replace('intl-pt', 'embed'));
    }
    return this.urlMusicaEmbed[keyMusica];
  }
    
}
