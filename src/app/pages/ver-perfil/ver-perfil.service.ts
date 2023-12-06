import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerPerfilService {

  constructor(private http: HttpClient) { }

  async verificarToken(token: any) {
    try {
      const tokenValido: any = await this.http.get(`https://musictaste-backend.onrender.com/verificar-token/${token}`).toPromise();
      return tokenValido;
    } catch (error) {
      console.error('Erro ao buscar TOKEN:', error);
    }
  }

  async buscarInfosUsuario(userID: any): Promise<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    try {
      const infosUsuario: any = await this.http.get(`https://musictaste-backend.onrender.com/usuarios/${userID}`).toPromise();
      return infosUsuario;
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    }
  }
}
