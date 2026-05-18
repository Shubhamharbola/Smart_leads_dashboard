export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'sales'
}

export interface Lead {
  _id: string
  name: string
  email: string
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost'
  source: 'Website' | 'Instagram' | 'Referral'
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface LeadsResponse {
  leads: Lead[]
  pagination: PaginationData
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}