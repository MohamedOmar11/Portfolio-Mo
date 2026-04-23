import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  company: string;
  feedback: string;
  rating: number;
  avatar: string;
  order: number;
  isVisible: boolean;
}

const TestimonialSchema: Schema = new Schema({
  clientName: { type: String, required: true },
  company: { type: String },
  feedback: { type: String, required: true },
  rating: { type: Number, default: 5 },
  avatar: { type: String },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
