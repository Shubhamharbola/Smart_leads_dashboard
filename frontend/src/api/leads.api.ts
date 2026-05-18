import api from './axios'
import { LeadsResponse, Lead } from '../types'

export const getLeads = async (params: object): Promise<LeadsResponse> => {
  const { data } = await api.get('/leads', { params })
  return data
}

export const createLead = async (lead: Partial<Lead>): Promise<Lead> => {
  const { data } = await api.post('/leads', lead)
  return data
}

export const updateLead = async (id: string, lead: Partial<Lead>): Promise<Lead> => {
  const { data } = await api.put(`/leads/${id}`, lead)
  return data
}

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`)
}

export const exportCSV = async (): Promise<void> => {
  const response = await api.get('/leads/export/csv', { responseType: 'blob' })
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'leads.csv')
  document.body.appendChild(link)
  link.click()
  link.remove()
}