import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse, AddTransactionRequest} from "../types/Interface";
import type { AddTransactionResponse } from "../types/Interface";


export async function signupUser(data: SignupRequest): Promise<SignupResponse> {
  const response = await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function addTransaction(
  data: AddTransactionRequest,
  accessToken: string
): Promise<AddTransactionResponse> {
  const response = await fetch("http://localhost:8000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Add transaction failed");
  }

  return response.json();
}

export async function getTransactions(accessToken: string): Promise<AddTransactionResponse[]> {
  const response = await fetch("http://localhost:8000/transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json();
}

export async function getTransactionsByDate(accessToken: string, date: string): Promise<AddTransactionResponse[]> {
  const response = await fetch(`http://localhost:8000/transactions?transaction_date=${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions by date");
  }

  return response.json();
}