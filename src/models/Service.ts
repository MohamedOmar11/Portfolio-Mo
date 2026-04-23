import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  price: string;
  features: string[];
  order: number;
  isVisible: boolean;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  features: [{ type: String }],
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
});

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
