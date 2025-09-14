import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../constants/api.constants";
// import { Permission } from "../../model/permission";
import { Role } from "../../model/role";
@Injectable({
  providedIn:'root'
})

export class RolesService {
  private apiurl = `${API_URL}/roles`;

  constructor(private http: HttpClient){}

  getRoles(params:any): Observable<{data:Role[]}>{
    return this.http.get<{data:Role[]}>(this.apiurl,{params})
  }
}