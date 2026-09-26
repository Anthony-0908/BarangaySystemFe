import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

import { API_URL } from "../constants/api.constants";
import { Role } from "../../model/role";
import { PaginatedResponse } from "@core/interfaces";
import { RoleDto } from "app/Admin/role/role.dto";
import { RoleMapper } from "app/Admin/role/role.mapper";
import { ApiResponse } from "@core/models/api-response";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiurl = `${API_URL}/roles`;

  constructor(private http: HttpClient) {}

  getRoles(params?: any): Observable<PaginatedResponse<Role>> {

    return this.http
      .get<ApiResponse<PaginatedResponse<RoleDto>>>(
        this.apiurl,
        { params }
      )
      .pipe(
        map(res => ({
          records: res.data.records.map(dto =>
            RoleMapper.fromJson(dto)
          ),

          pagination: res.data.pagination
        }))
      );
  }
}