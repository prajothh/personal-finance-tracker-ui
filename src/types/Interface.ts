export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  user_id: number;
  name: string;
  email: string;
}

// Add these for login:
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}