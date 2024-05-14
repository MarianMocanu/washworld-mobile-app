export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    isActive: boolean,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isActive = isActive;
  }
  static fromJson(json: any): User {
    return new User(
      json.id,
      json.firstName,
      json.lastName,
      json.email,
      json.password,
      json.role,
      json.isActive,
    );
  }
  toJson(): any {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: this.role,
      isActive: this.isActive,
    };
  }
}
