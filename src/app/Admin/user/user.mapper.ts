import { Mapper } from '../../core/interfaces';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { UserRoleMapper } from './user-role.mapper';

export const UserMapper: Mapper<UserDto, User> = {

  fromJson(dto: UserDto): User {
    return new User(
      dto.id,
      dto.first_name,
      dto.last_name,
      dto.email,
      dto.gender,
      new Date(dto.birthdate),
      dto.address,
      dto.phone_no,
      dto.role_names,
      dto.roles.map(role =>
        UserRoleMapper.fromJson(role)
      )
    );
  },

  toJson(model: User): UserDto {
    return {
      id: model.id,
      employee_id: null,
      photo: null,

      first_name: model.firstName,
      last_name: model.lastName,
      email: model.email,

      address: model.address,
      phone_no: model.phoneNo,

      gender: model.gender,
      birthdate: model.birthdate.toISOString(),

      email_verified_at: null,
      created_at: '',
      updated_at: '',

      role_names: model.roleNames,

      roles: model.roles.map(role =>
        UserRoleMapper.toJson(role)
      )
    };
  }
};