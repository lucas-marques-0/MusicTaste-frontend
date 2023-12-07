import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerPerfilService {

  constructor(private http: HttpClient) { }

  async buscarDadosVerPerfil(dado: any): Promise<any> {
    try {
      const infosUsuario: any = await this.http.get(`https://musictaste-backend.onrender.com/usuarios/${dado}`).toPromise();
      return infosUsuario;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }
}
