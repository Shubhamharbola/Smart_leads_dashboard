import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from '../types/user.types'

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['admin', 'sales'], default: 'sales' },
}, { timestamps: true })

export default mongoose.model<IUserDocument>('User', UserSchema)