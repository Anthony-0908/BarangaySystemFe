import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/api.constants';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${API_URL}/users`;

  constructor(private http: HttpClient) {}

  getUsers(params: any): Observable<{ data: User[]; total: number }> {
    return this.http.get<{ data: User[]; total: number }>(this.apiUrl,{params});
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
