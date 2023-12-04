import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerPerfilService {

  constructor(private http: HttpClient) { }


  async buscarInfosUsuario(userID: any): Promise<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    try {
      const infosUsuario: any = await this.http.get('https://musictaste-backend.onrender.com/usuarios/' + userID, { headers, observe: 'response', responseType: 'text' }).toPromise();
      console.log('Response Headers:', infosUsuario.headers);
      return infosUsuario;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }
}
