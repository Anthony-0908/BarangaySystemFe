export class Permission {
  constructor(
    public id: number,
    public name: string,
    public guard_name: string,
    public pivot: PermissionPivot
  ) {}
}

export class PermissionPivot {
  constructor(
    public role_id: number,
    public permission_id: number
  ) {}
}