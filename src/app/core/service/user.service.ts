import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_URL } from '../constants/api.constants';
import { User } from '../../Admin/user/user.model';
import { ApiResponse } from '@core/models/api-response';
import { PaginatedResponse } from '@core/interfaces';
import { UserDto } from 'app/Admin/user/user.dto';
import { UserMapper } from 'app/Admin/user/user.mapper';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${API_URL}/users`;

  constructor(private http: HttpClient) {}

  getUsers(params: any): Observable<PaginatedResponse<User>> {
  return this.http
    .get<ApiResponse<PaginatedResponse<UserDto>>>(
      this.apiUrl,
      { params }
    )
    .pipe(
      map(res => ({
        records: res.data!.records.map(dto =>
          UserMapper.fromJson(dto)
        ),
        pagination: res.data!.pagination
      }))
    );
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
