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
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': 'https://musictasteshare.vercel.app'
    });
    headers.set("Access-Control-Allow-Origin", "*")
    headers.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    const options = { headers };
    try {
      const url = `https://musictaste-backend.onrender.com/usuarios/${userID}`;
      const infosUsuario: any = await this.http.get(url, options).toPromise();
      return infosUsuario;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }
}
