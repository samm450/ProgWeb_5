import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterDTO, LoginDTO, LoginResultDTO } from '../models/models';

const LOCAL_STORAGE_EMAIL_KEY = "email";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = "http://localhost:5106/api/";
  accountBaseUrl = this.baseUrl + "Account/";

  authenticatedUserEmail: string | null = null;

  constructor(public http: HttpClient) {

  }

  async registerAndLogin(registerData: RegisterDTO): Promise<void> {
    let result = await lastValueFrom(this.http.post<LoginResultDTO>(this.accountBaseUrl + 'Register', registerData));
    localStorage.setItem("token", result.token);
    this.setUserEmail(result.email);
  }

  async login(loginData: LoginDTO): Promise<void> {
    let result = await lastValueFrom(this.http.post<LoginResultDTO>(this.accountBaseUrl + 'Login', loginData));
    localStorage.setItem("token", result.token);
    this.setUserEmail(result.email);
  }

  async logout(): Promise<void> {
    localStorage.removeItem("token");
    this.setUserEmail(null);
  }

  async testAuthorize(): Promise<void> {
    let result = await lastValueFrom(this.http.get<any>(this.accountBaseUrl + 'Test'));
    console.log(result);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY) != null;
  }

  private setUserEmail(email: string | null) {
    if (email == null) {
      localStorage.removeItem(LOCAL_STORAGE_EMAIL_KEY);
    }
    else {
      localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
    }
    this.authenticatedUserEmail = email;
  }
}
