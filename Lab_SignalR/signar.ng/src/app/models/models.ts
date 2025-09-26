export interface Channel {
  id: number;
  title: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginResultDTO {
  email: string;
  token: string;
}

export interface UserEntry {
  value: string;
  key: string;
}
