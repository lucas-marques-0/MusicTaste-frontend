import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  async buscarUsuarios(): Promise<any> {
    try {
      const usuariosCadastrados = await this.http.get('https://musictaste-backend.onrender.com/usuarios/criar').toPromise();
      return usuariosCadastrados;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async verifyPassword(inputUsername: any, inputPassword: any): Promise<boolean> {
    //const usuarios = await this.buscarUsuarios();
    //const usuarioEncontrado = usuarios.find((usuario: any) => usuario.username === inputUsername);
    const usuarioEncontrado: any = await this.http.post('https://musictaste-backend.onrender.com/usuarios/login', { username: inputUsername, password: inputPassword }).toPromise();
    const storedPassword = usuarioEncontrado.password;
    const [storedSalt, storedHash] = storedPassword.split(':');
    const salt = CryptoJS.enc.Hex.parse(storedSalt);
    const key = CryptoJS.PBKDF2(inputPassword, salt, { keySize: 256 / 32, iterations: 1000 });
    const hash = CryptoJS.SHA256(key);
    const inputHash = hash.toString(CryptoJS.enc.Hex);
    return inputHash === storedHash;
  }
}
