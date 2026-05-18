import mongoose, { Schema, Document } from 'mongoose'
import { ILead, LeadStatus, LeadSource } from '../types/lead.types'

export interface ILeadDocument extends ILead, Document {}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Lost'], 
    default: 'New' 
  },
  source: { 
    type: String, 
    enum: ['Website', 'Instagram', 'Referral'], 
    required: true 
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export default mongoose.model<ILeadDocument>('Lead', LeadSchema)