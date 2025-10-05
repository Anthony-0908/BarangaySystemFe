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

  // ✅ Helper to attach Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  // ✅ GET all users (with pagination + filters)
  getUsers(params: any): Observable<{ data: User[]; total: number }> {
    const headers = this.getAuthHeaders();

    // optional query params handling
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach((key) => {
      httpParams = httpParams.set(key, params[key]);
    });

    return this.http.get<{ data: User[]; total: number }>(this.apiUrl, {
      headers,
      params: httpParams
    });
  }

  // ✅ GET user by ID
  getUserById(id: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
  }

  // ✅ CREATE new user
  createUser(user: Partial<User>): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  // ✅ UPDATE existing user
  updateUser(id: number, user: Partial<User>): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  // ✅ DELETE user
  deleteUser(id: number): Observable<{ message: string }> {
    const headers = this.getAuthHeaders();
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`, { headers });
  }
}
