import { LoginRequest, SignUpRequest, User } from "./User";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  signUp: (data: SignUpRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}
