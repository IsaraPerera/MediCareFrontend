export type Role = "ADMIN" | "DOCTOR" | "PATIENT" | "RECEPTIONIST" | "LAB_TECHNICIAN";

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: Role;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  fullName: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: User;
}
