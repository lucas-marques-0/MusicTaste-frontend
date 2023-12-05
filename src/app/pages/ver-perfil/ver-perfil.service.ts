import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerPerfilService {

  constructor(private http: HttpClient) { }


  async buscarInfosUsuario(userID: any): Promise<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`,
    });

    try {
      const infosUsuario: any = await this.http.get(`https://musictaste-backend.onrender.com/usuarios/${userID}`, { headers }).toPromise();
      return infosUsuario;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }
}
