import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EditarUsuarioService } from './editar-usuario.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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
    'Música que quase ninguém conhece.',
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
  urlMusicaEmbed: { [key: string]: SafeResourceUrl } = {};
  usuarios: any = [];
  isLoading: boolean = true;
  isLoadingDelete: boolean = false;
  
  async ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id')
    const userInfosObj = await this.editarUsuarioService.buscarInfosUsuario(this.userID)
    if (!userInfosObj) {
      await this.router.navigate(['/'])
    } else {
      this.usuarioInfos = userInfosObj    
      this.musicasUsuario = userInfosObj.musicas
      this.isLoading = false
    }
  }

  async excluirMusica(chave: any) {
    this.isLoadingDelete = true;
    const musica = this.musicasUsuario.find((musica: any) => musica.key === chave);
    musica.value = '';
    await this.atualizarMusicas(this.userID, this.musicasUsuario);
    await window.location.reload();
    this.isLoadingDelete = false;
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
        if(value.includes('spotify.link')) {
          this.exibirSwal('Erro!', 'error', 'O link digitado está encurtado! No app do spotify, tente clicar em "..."  e depois "Copiar".');
          this.linksMusicas[musica.key] = ''
        } else {
          this.exibirSwal('Erro!', 'error', 'O link digitado não é válido :/');
          this.linksMusicas[musica.key] = ''
        }
      }
    }
    if(acao == 2) {
      const value = this.linksMusicasAtualizadas[musica.key]
      const iframe = document.querySelector(`#iframe-${musica.key}`) as any;
      if(this.verificarUrlSpotify(value)) {
        musica.value = value
        if(value.includes('intl-pt')){
          iframe.src = value.replace('intl-pt', 'embed');
        } else {
          iframe.src = value.replace('/track/', '/embed/track/')
        }
        this.atualizarMusicas(this.userID, this.musicasUsuario)
        this.linksMusicasAtualizadas[musica.key] = ''
      } else {
        if(value.includes('spotify.link')) {
          this.exibirSwal('Erro!', 'error', 'O link digitado está encurtado, No app do spotify, tente clicar em "..."  e depois "Copiar :/');
          this.linksMusicasAtualizadas[musica.key] = ''
        } else {
          this.exibirSwal('Erro!', 'error', 'O link digitado não é válido :/');
          this.linksMusicasAtualizadas[musica.key] = ''
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

  verificarUrlSpotify(link: string): boolean {
    const regex = /^https:\/\/open\.spotify\.com\/(intl-pt\/)?track\/([a-zA-Z0-9]{22})(\?.*)?$/;
    const match = link.match(regex);
    if (match && match[2] && match[2].length === 22) {
      return true;
    } else {
      return false;
    }
  }

  async atualizarMusicas(userID: any, musicasUsuario: any) {
    await this.editarUsuarioService.atualizarMusicasUsuario(userID, musicasUsuario); 
  }

  mostrarMusica(keyMusica: any, linkMusica: any) {
    if (!this.urlMusicaEmbed[keyMusica]) {
      if(linkMusica.includes('intl-pt')) {
        this.urlMusicaEmbed[keyMusica] = this.sanitizer.bypassSecurityTrustResourceUrl(linkMusica.replace('intl-pt', 'embed'));
      } else {
        this.urlMusicaEmbed[keyMusica] = this.sanitizer.bypassSecurityTrustResourceUrl(linkMusica.replace('/track/', '/embed/track/'));
      }
    }
    return this.urlMusicaEmbed[keyMusica];
  }
}
