import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { API_URL } from '../../core/constants/api.constants';
import { PaginatedResponse } from '../../core/interfaces';

import { UserDto } from './user.dto';
import { User } from './user.model';
import { UserMapper } from './user.mapper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${API_URL}/users`;

  constructor(private http: HttpClient) {}


  getUsers(params: any): Observable<PaginatedResponse<User>> {
    return this.http
      .get<PaginatedResponse<UserDto>>(this.apiUrl, { params })
      .pipe(
        map(res => ({
          ...res,
          data: res.data.map(dto => UserMapper.fromJson(dto))
        }))
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<UserDto>(`${this.apiUrl}/${id}`)
      .pipe(map(dto => UserMapper.fromJson(dto)));
  }

  createUser(model: User): Observable<User> {
    const payload = UserMapper.toJson(model);

    return this.http
      .post<UserDto>(this.apiUrl, payload)
      .pipe(map(dto => UserMapper.fromJson(dto)));
  }

  updateUser(id: number, model: User): Observable<User> {
    const payload = UserMapper.toJson(model);

    return this.http
      .put<UserDto>(`${this.apiUrl}/${id}`, payload)
      .pipe(map(dto => UserMapper.fromJson(dto)));
  }

  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
