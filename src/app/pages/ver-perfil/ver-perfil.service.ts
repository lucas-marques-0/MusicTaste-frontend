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
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
      withCredentials: false, 
      responseType: 'text' as 'json', 
      observe: 'response' as 'body'
    };

    try {
      const infosUsuario: any = await this.http.get(`https://musictaste-backend.onrender.com/usuarios/${userID}`, options).toPromise();
      console.log('Response Headers:', infosUsuario.headers);
      return infosUsuario;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }
}
