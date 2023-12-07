import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt from 'jsonwebtoken'

@Injectable({
  providedIn: 'root'
})
export class VerPerfilService {

  constructor(private http: HttpClient) { }

  async buscarInfosUsuario(userID: any): Promise<any> {
    const token = localStorage.getItem('token');
    const tokenObj: any = {
      "token": token,
    };

    try {
      const infosUsuario: any = await this.http.get(`https://musictaste-backend.onrender.com/usuarios/${userID}`, tokenObj).toPromise();
      return infosUsuario;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }
}
