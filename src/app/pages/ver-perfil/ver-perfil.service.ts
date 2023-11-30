import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerPerfilService {

  constructor(private http: HttpClient) { }

  
  async buscarInfosUsuario(userID: any): Promise<any> {
    const header = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    try {
      const infosUsuario = await this.http.get('https://musictaste-backend.onrender.com/usuarios/'+userID, { headers: header }).toPromise();
      return infosUsuario;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }
}
