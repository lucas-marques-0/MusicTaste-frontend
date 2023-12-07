import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '../home/home.service';

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioService {

  constructor(private http: HttpClient, private  homeService: HomeService) { }

  async buscarInfosUsuario(userID: any): Promise<any> {
    try {
      return await this.http.get(`https://musictaste-backend.onrender.com/usuarios/${userID}`).toPromise();
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }

  async atualizarMusicasUsuario(userID: any, musicasUsuario: any): Promise<any> {
    try {
      await this.http.put(`https://musictaste-backend.onrender.com/usuarios/${userID}`, { userID, musicasUsuario }).toPromise();
    } catch (error) {
      console.error('Erro ao atualizar musicas do usuário:', error);
    }
  }

}
