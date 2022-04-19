import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import jwt_decode from "jwt-decode";

import { User } from './User';
import { RegisterUser } from './RegisterUser';

import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }

  // pulls the item "access_token" from "localStorage"
  getToken(): string {
    return localStorage.getItem("access_token");
  }

  setToken(token: string): void { // Created
    localStorage.setItem("access_token", token); // TODO
  }

  readToken(): User { 
    const token = this.getToken();

    if (token) return jwt_decode(token);
    else return null;
  }

  isAuthenticated(): boolean {
    return (this.getToken()) ? true : false;
  }

  // sending the user data via a POST request
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

