import mongoose, { Document, Schema } from 'mongoose';

export interface IProgressLog extends Document {
  userId: mongoose.Types.ObjectId;
  planId?: mongoose.Types.ObjectId;
  date: Date;
  completedExercises: string[];
  mood: 'great' | 'good' | 'okay' | 'tired';
  notes?: string;
  createdAt: Date;
}

const ProgressLogSchema = new Schema<IProgressLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  planId: { type: Schema.Types.ObjectId, ref: 'Plan' },
  date: { type: Date, required: true, index: true },
  completedExercises: [{ type: String }],
  mood: { type: String, enum: ['great', 'good', 'okay', 'tired'], required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const ProgressLog = mongoose.model<IProgressLog>('ProgressLog', ProgressLogSchema);
