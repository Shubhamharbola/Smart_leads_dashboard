import { Lead } from '../types'

interface LeadTableProps {
  leads: Lead[]
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
  userRole: string
}

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-600',
  Contacted: 'bg-yellow-100 text-yellow-600',
  Qualified: 'bg-green-100 text-green-600',
  Lost: 'bg-red-100 text-red-600',
}

const LeadTable = ({ leads, onEdit, onDelete, userRole }: LeadTableProps) => {
  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500">No leads found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Name</th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Email</th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Source</th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Created</th>
            <th className="text-left px-4 py-3 text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{lead.name}</td>
              <td className="px-4 py-3 text-gray-600">{lead.email}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[lead.status]}`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">{lead.source}</td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(lead)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  {userRole === 'admin' && (
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadTable