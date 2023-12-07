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
    try {
      return await this.http.post(`https://musictaste-backend.onrender.com/usuarios/${userID}`, { token: token }).toPromise();
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      return false;
    }
  }
}
