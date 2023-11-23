import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  avatarUrl: any = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed='

  async adicionarUsuario(usuario: any, email: any, senha: any): Promise<any> {
    const avatarUsuario = this.avatarUrl + usuario;
    const listaMusicas = [
      { 0: '' },
      { 1: '' },
      { 2: '' },
      { 3: '' },
      { 4: '' },
      { 5: '' },
      { 6: '' },
      { 7: '' },
      { 8: '' },
      { 9: '' },
    ]
    try {
      await this.http.post('https://musictaste-backend.onrender.com/usuarios', { username: usuario, email: email, password: senha, avatar: avatarUsuario, musicas: listaMusicas }).toPromise();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error); 
    }
  }  

  async verificarUsuarioExistente(email: any): Promise<boolean> {
    const usuariosCadastrados: any = await this.buscarUsuarios();
    return usuariosCadastrados.find((user: any) => { email === user.email});
  }

  async buscarUsuarios(): Promise<any> {
    try {
      const usuariosCadastrados = await this.http.get('https://musictaste-backend.onrender.com/usuarios').toPromise();
      return usuariosCadastrados;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }
  
}
