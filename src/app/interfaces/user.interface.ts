export interface RegisterRequest{
  email: string;
  displayName: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  displayName: string;
  role: string;
  enabled: boolean;
  username: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}
