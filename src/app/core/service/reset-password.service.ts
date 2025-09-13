import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { API_URL } from '../constants/api.constants';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root' // makes the service available app-wide
})

export class AuthService { 
  private apiurl = `${API_URL}/auth`;

  constructor(private http: HttpClient){}

  resetpassword(email: string): Observable<any>{
    return this.http.post<any>(`${this.apiurl}/reset-password`,email);
  }
}