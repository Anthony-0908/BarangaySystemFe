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
 

  constructor(private http: HttpClient){}

  //GET all users 
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiurl);
  }
}