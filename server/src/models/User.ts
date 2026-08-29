import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  bio?: string;
  streak: number;
  lastActiveDate: Date;
  totalPlansGenerated: number;
  emailVerified: boolean;
  emailVerifyToken?: string;
  emailVerifyExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: Date.now },
  totalPlansGenerated: { type: Number, default: 0 },
  emailVerified: { type: Boolean, default: false },
  emailVerifyToken: { type: String },
  emailVerifyExpires: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', UserSchema);
