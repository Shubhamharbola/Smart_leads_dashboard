import api from './axios'
import { AuthResponse } from '../types'

export const registerUser = async (name: string, email: string, password: string, role: string): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/register', { name, email, password, role })
  return data
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}