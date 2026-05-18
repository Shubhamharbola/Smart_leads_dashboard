import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getLeads, deleteLead, exportCSV } from '../api/leads.api'
import { Lead, PaginationData } from '../types'
import useDebounce from '../hooks/useDebounce'
import Navbar from '../components/Navbar'
import LeadTable from '../components/LeadTable'
import LeadForm from '../components/LeadForm'
import Filters from '../components/Filters'

const Dashboard = () => {
  const { user } = useAuth()
  const [leads, setLeads] = useState<Lead[]>([])
  const [pagination, setPagination] = useState<PaginationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [source, setSource] = useState('')
  const [sort, setSort] = useState('latest')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editLead, setEditLead] = useState<Lead | null>(null)

  const debouncedSearch = useDebounce(search, 500)

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const data = await getLeads({ status, source, search: debouncedSearch, sort, page, limit: 10 })
      setLeads(data.leads)
      setPagination(data.pagination)
    } catch (err) {
      setError('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [debouncedSearch, status, source, sort, page])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    try {
      await deleteLead(id)
      fetchLeads()
    } catch (err) {
      setError('Failed to delete lead')
    }
  }

  const handleEdit = (lead: Lead) => {
    setEditLead(lead)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditLead(null)
    fetchLeads()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Leads Dashboard</h1>
          <div className="flex gap-3">
            {user?.role === 'admin' && (
              <button
                onClick={exportCSV}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Export CSV
              </button>
            )}
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Lead
            </button>
          </div>
        </div>

        <Filters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          source={source}
          setSource={setSource}
          sort={sort}
          setSort={setSort}
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading...</p>
        ) : (
          <LeadTable
            leads={leads}
            onEdit={handleEdit}
            onDelete={handleDelete}
            userRole={user?.role || 'sales'}
          />
        )}

        {pagination && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Total: {pagination.total} leads | Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <LeadForm
          onClose={handleFormClose}
          editLead={editLead}
        />
      )}
    </div>
  )
}

export default Dashboard