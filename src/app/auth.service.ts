import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { User } from './User';
import { RegisterUser } from './RegisterUser';

import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem("access_token");
  }

  readToken(): User {
    const token = this.getToken();
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return (token) ? true : false;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/login`, user);
  }

  logout(): void {
    localStorage.removeItem("access_token");
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(`${environment.userAPIBase}/register`, registerUser);
  }
}
