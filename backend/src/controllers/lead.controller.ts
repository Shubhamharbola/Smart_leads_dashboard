import { Response } from 'express'
import Lead from '../models/lead.model'
import { AuthRequest } from '../middleware/auth.middleware'
import { Parser } from 'json2csv'

// Create Lead
export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body

    const lead = await Lead.create({
      name,
      email,
      status: status || 'New',
      source,
      createdBy: req.user?.id
    })

    res.status(201).json({ message: 'Lead created successfully', lead })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get All Leads with filtering, search, sort and pagination
export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, source, search, sort, page, limit } = req.query

    const query: any = {}

    if (status) query.status = status
    if (source) query.source = source
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    const sortOrder = sort === 'oldest' ? 1 : -1
    const pageNum = parseInt(page as string) || 1
    const limitNum = parseInt(limit as string) || 10
    const skip = (pageNum - 1) * limitNum

    const total = await Lead.countDocuments(query)
    const leads = await Lead.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limitNum)

    res.status(200).json({
      leads,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Get Single Lead
export const getLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' })
      return
    }
    res.status(200).json({ lead })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Update Lead
export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' })
      return
    }
    res.status(200).json({ message: 'Lead updated successfully', lead })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Delete Lead
export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' })
      return
    }
    res.status(200).json({ message: 'Lead deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
// Export Leads as CSV
export const exportLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find({})

    const fields = ['name', 'email', 'status', 'source', 'createdAt']
    const parser = new Parser({ fields })
    const csv = parser.parse(leads)

    res.header('Content-Type', 'text/csv')
    res.attachment('leads.csv')
    res.send(csv)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}