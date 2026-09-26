import { PermissionDto } from '@core/dto/permission.dto';
import { Permission, PermissionPivot } from '../../model/permission';

export class PermissionMapper {

  static fromJson(dto: PermissionDto): Permission {
    return new Permission(
      dto.id,
      dto.name,
      dto.guard_name,
      new PermissionPivot(
        dto.pivot?.role_id ?? 0,
        dto.pivot?.permission_id ?? 0
      )
    );
  }
}