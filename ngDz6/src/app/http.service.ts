import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  postData(user: User) {
    const body = { login: user.login, password: user.password };
    return this.http.post('http://localhost:3000/postuser', body);
  }
}
