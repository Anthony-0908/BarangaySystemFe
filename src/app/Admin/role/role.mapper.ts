import { UserRoleDto } from "../user/user-role.dto";
import { UserRole } from "../user/user-role.model";

export const RoleMapper = {
  fromDto(dto: UserRoleDto): UserRole {
    return new UserRole(dto.id, dto.name, dto.guard_name);
  }
};