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
  name?: string;   // <-- add this
  email?: string;
}

export interface AddTransactionRequest {
  amount: number;
  category: string;
  type: string;
  notes: string;
  transaction_date: string;
}

export interface AddTransactionResponse {
  transaction_id: number;
  amount: number;
  category: string;
  type: string;
  notes: string;
  transaction_date: string;
}

export interface GoalRequest {
  target_amount: number;
  target_date: string;
  notes?: string;
}

export interface GoalResponse {
  goal_id: number;
  target_amount: number;
  target_date: string;
  notes?: string;
  progress: number;
}