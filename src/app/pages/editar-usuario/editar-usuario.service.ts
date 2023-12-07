import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioService {

  constructor(private http: HttpClient) { }

  async buscarInfosUsuario(userID: any): Promise<any> {
    const token = localStorage.getItem('token');
    try {
      return await this.http.post(`https://musictaste-backend.onrender.com/usuarios/${userID}`, { token: token }).toPromise();
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      return false;
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
