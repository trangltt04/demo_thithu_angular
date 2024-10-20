import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type User = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  registerUser(data: User) {
    return this.http.post('http://localhost:3000/register', data);
  }

  loginUser(data: User) {
    return this.http.post('http://localhost:3000/login', data);
  }
}
