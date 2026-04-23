import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  problem: string;
  solution: string;
  result: string;
  images: string[];
  isVisible: boolean;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  result: { type: String, required: true },
  images: [{ type: String }],
  isVisible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
