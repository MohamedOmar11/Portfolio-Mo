import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  section: string;
  key: string;
  value: string;
}

const ContentSchema: Schema = new Schema({
  section: { type: String, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
});

ContentSchema.index({ section: 1, key: 1 }, { unique: true });

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
