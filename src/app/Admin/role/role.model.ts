import { Permission } from "app/model/permission";

// user-role.model.ts
export class Role {
  constructor(
    public id: number,
    public name: string,
    public guardName: string,
    public permissions: Permission[] = [] 
  ) {}
}
