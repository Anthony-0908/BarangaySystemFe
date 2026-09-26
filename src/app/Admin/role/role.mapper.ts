import { RoleDto } from './role.dto';
import { Role } from '../../model/role';
import { PermissionMapper } from '../permission/permission.mapper';

export class RoleMapper {

  static fromJson(dto: RoleDto): Role {
    return {
      id: dto.id,
      name: dto.name,
      guard_name: dto.guard_name,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
      permissions: dto.permissions.map(permission =>
        PermissionMapper.fromJson(permission)
      )
    };
  }
}