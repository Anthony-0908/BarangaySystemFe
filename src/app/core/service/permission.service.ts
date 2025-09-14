import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../constants/api.constants";
// import { Permission } from "../../model/permission";

@Injectable({
  providedIn:'root'
})

export class PermissionService {
  private apiurl = `${API_URL}/permissions`;

  constructor(private http: HttpClient){}

  // getPermissions(params:any): Observable<>{

  // }
}