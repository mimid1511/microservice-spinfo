export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: string[];
  tickets?: string[];
  eventsAdmin?: string[]
}
