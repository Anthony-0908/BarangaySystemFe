
import { Mapper } from '../../core/interfaces';
import { UserDto } from './user.dto';
import { User } from './user.model';
import { UserRoleMapper } from './user-role.mapper'



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
      dto.roles.map(role => UserRoleMapper.fromJson(role))
    );
  },

  toJson(model: User): UserDto {
    return {
      id: model.id,
      first_name: model.firstName,
      last_name: model.lastName,
      email: model.email,
      address: model.address ?? null,
      gender: model.gender,
      birthdate: model.birthdate.toISOString(),
      phone_no: model.phoneNo ?? null,
      employee_id: null,
      photo: null,
      email_verified_at: null,
      created_at: '',
      updated_at: '',
      role_names: model.roles.map(r => r.name),
      roles: model.roles.map(r => UserRoleMapper.toJson(r))
    };
  }
};
