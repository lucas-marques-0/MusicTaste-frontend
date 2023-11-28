import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  async buscarUsuarios(): Promise<any> {
    try {
      const usuariosCadastrados = await this.http.get('https://musictaste-backend.onrender.com/usuarios').toPromise();
      return usuariosCadastrados;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async logarUsuario(userID: any, password: any): Promise<any> {
    try {
      await this.http.post('https://musictaste-backend.onrender.com/usuarios', { userID: userID, password: password, action: 'login' }).toPromise();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error); 
    }
  }

  async verificarUsuarioExistente(email: any) {
    const usuariosCadastrados: any = await this.buscarUsuarios();
    return usuariosCadastrados.find((user: any) => email === user.email);
  }
}
