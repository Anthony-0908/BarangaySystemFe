import { PermissionDto } from "@core/dto/permission.dto";
import { BaseDto } from "@core/interfaces/base-dto.interface";

export interface RoleDto extends BaseDto { 
  name: string
  guard_name: string
  created_at: string;
  updated_at: string;
  permissions: PermissionDto[]
  
}