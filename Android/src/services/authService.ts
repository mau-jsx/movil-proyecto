const API_URL = 'http://10.254.199.181:3000';

export interface RegisterData {
  name: string;
  email: string;
  province: string;
  city: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw Array.isArray(result.message) ? result.message : [result.message];
  }

  return result;
};

export const loginUser = async (data: LoginData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw Array.isArray(result.message) ? result.message : [result.message];
  }

  return result;
};

export const logoutUser = async () => {
  const res = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Error al cerrar sesión');
  }

  return result;
};

export const verifyEmail = async (email: string, code: string) => {
  const res = await fetch(`${API_URL}/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Verificación fallida');
  }

  return result;
};

export const resendVerificationEmail = async (email: string) => {
  const res = await fetch(`${API_URL}/resend-verification-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'No se pudo reenviar el código');
  }

  return result;
};
