import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  budget: string;
  projectType: string;
  message: string;
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  budget: { type: String, required: true },
  projectType: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
