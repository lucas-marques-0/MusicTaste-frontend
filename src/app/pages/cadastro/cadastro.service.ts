import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  avatarUrl: any = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed='

  async adicionarUsuario(usuario: any, email: any, senha: any): Promise<any> {
    let avatarUsuario = this.avatarUrl + usuario;
    let listaMusicas = Array.from({ length: 10 }, (value, key) => ({ key: key.toString(), value: '' }));
    try {
      await this.http.post('https://musictaste-backend.onrender.com/usuarios', { usuario: usuario, email: email, senha: senha, avatar: avatarUsuario, musicas: listaMusicas }).toPromise();
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

  hashPassword(password: string): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8); 
    const key = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations: 1000 });
    const hash = CryptoJS.SHA256(key);
    const saltHex = salt.toString(CryptoJS.enc.Hex);
    const hashHex = hash.toString(CryptoJS.enc.Hex);
    return `${saltHex}:${hashHex}`;
  }
  
}
