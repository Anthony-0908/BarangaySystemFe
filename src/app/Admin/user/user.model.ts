// user.model.ts
import { UserRole } from "./user-role.model";

export class User {
    constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: string,
    public birthdate: Date,
    public address: string | null,
    public phoneNo: string | null,
    public roleNames: string[],
    public roles: UserRole[],
    public password?: string,
    public emailVerifiedAt?: Date,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
