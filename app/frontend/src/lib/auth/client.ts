'use client';

import api from '@/api';
import { User } from '@/types/user';
import { toast } from 'react-toastify';

export interface SignUpParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(data: SignUpParams): Promise<{ status?: string }> {
    try {
      const response = await api.post('/auth/signup', data);
      localStorage.setItem('auth-token', response.data.access_token);
      toast.success('Welcome !', { autoClose: 2500 });
      return { status: 'OK' };
    } catch (error) {
      toast.error('Something went wrong :(', { autoClose: 2500 });
      return { status: 'Network error' };
    }
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ status?: string }> {
    try {
      const response = await api.post('/auth/signin', params);
      localStorage.setItem('auth-token', response.data.access_token);
      toast.success('Welcome !', { autoClose: 2500 });
      return { status: 'OK' };
    } catch (error) {
      toast.error('Invalid credentials :(', { autoClose: 2500 });
      return { status: 'Invalid credentials' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      return { data: null };
    }
    const response = await api.get('/autoAuth/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data.user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
