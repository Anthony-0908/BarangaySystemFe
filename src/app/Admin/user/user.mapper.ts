// user.mapper.ts
import { UserDto } from "./user.dto";
import { User } from "./user.model";
import { RoleMapper } from "../role/role.mapper";

export const UserMapper = {
  fromDto(dto: UserDto): User {
    return new User(
      dto.id,
      dto.first_name,
      dto.last_name,
      dto.email,
      dto.gender,
      new Date(dto.birthdate),
      dto.address,
      dto.phone_no,
      dto.roles.map(RoleMapper.fromDto)
    );
  }
};
