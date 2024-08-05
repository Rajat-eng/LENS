import * as roles from "../config/roles.json";

interface Irole {
  name: string;
  permissions: string[];
}
export class Role {
  roles: Irole[];

  constructor() {
    this.roles = roles.roles;
  }

  getPermissionsRoleByName(name: string) {
    let role = this.roles.find((role: Irole) => role.name === name);
    return role?.permissions ?? [];
  }

  getRoles() {
    return this.roles;
  }
}
