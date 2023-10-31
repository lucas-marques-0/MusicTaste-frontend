import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  avatarUrl: any = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed='

  async adicionarUsuario(username: any, password: any): Promise<any> {
    let avatarUsuario = this.avatarUrl + username
    let listaMusicas = [
      { key: '0', value: '' },
      { key: '1', value: '' },
      { key: '2', value: '' },
      { key: '3', value: '' },
      { key: '4', value: '' },
      { key: '5', value: '' },
      { key: '6', value: '' },
      { key: '7', value: '' },
      { key: '8', value: '' },
      { key: '9', value: '' },
    ]
    // let listaMusicas = Array.from({ length: 10 }, (_, i) => ({ key: i.toString(), value: '' }));
    try {
      await this.http.post('https://musictaste-backend.onrender.com/usuarios', { username: username, password: password, avatar: avatarUsuario, musicas: listaMusicas }).toPromise();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error); 
    }
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

  async register(username: string, password: string) {
    const hashedPassword = this.hashPassword(password);
  }
  
}
