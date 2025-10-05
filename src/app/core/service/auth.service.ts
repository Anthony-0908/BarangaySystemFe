import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../constants/api.constants";
import {User} from '../models/auth.model'

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions?: string[];
  };
  access_token: string;
  token_type: string;
  expires_in: number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiurl = `${API_URL}/login`;

  constructor(private http: HttpClient) {}

  /** Strongly typed login */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiurl, { email, password });
  }

  /** Optional backend logout */
  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${API_URL}/logout`, {});
  }
}