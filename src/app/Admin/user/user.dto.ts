// user.dto.ts
import { UserRoleDto } from './user-role.dto'

export interface UserDto {
  id: number;
  employee_id: number | null;
  photo: string | null;
  first_name: string;
  last_name: string;
  email: string;
  address: string | null;
  phone_no: string | null;
  gender: string;
  birthdate: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  role_names: string[];
  roles: UserRoleDto[];
}
