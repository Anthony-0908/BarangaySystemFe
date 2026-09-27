import { BaseDto } from '@core/interfaces';

export interface PermissionDto  {
  id: number;
  name: string;
  guard_name: string;
  pivot?: PermissionPivotDto; 
}

export interface PermissionPivotDto {
  role_id: number;
  permission_id: number;
}
