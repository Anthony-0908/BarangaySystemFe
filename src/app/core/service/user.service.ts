import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { API_URL } from '../constants/api.constants';
import { User } from '../../model/user';


@Injectable({
  providedIn: 'root' // makes the service available app-wide
})

export class UserService {
  private apiurl = `${API_URL}/users`;

  constructor(private http: HttpClient) {}

  // GET all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiurl);
  }

  // GET one user by ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiurl}/${id}`);
  }

  // POST create a new user
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiurl, user);
  }

  // PUT update a user
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiurl}/${id}`, user);
  }

  // DELETE a user
  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiurl}/${id}`);
  }
}