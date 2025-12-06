import { Mapper } from "../../core/interfaces"
import { UserRoleDto } from "./user-role.dto"
import { UserRole } from "./user-role.model"

export const UserRoleMapper: Mapper<UserRoleDto, UserRole> = { 
  fromJson(dto: UserRoleDto): UserRole {
    return new UserRole(dto.id, dto.name, dto.guard_name, new Date(dto.created_at), new Date(dto.updated_at));  
  },

  toJson(model: UserRole): UserRoleDto { 
    return { 
      id: model.id,
      name: model.name,
      guard_name: model.guardName,
      created_at: model.created_at.toISOString(),
      updated_at: model.updated_at.toISOString()
    }
  }
}