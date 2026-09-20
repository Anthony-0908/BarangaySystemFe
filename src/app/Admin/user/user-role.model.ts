// user-role.model.ts
export class UserRole {
  constructor(
    public id: number,
    public name: string,
    public guardName: string,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
