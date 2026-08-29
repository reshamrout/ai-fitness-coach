import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';
import { generateToken } from '../utils/crypto';
import { sendVerificationEmail, sendPasswordResetEmail } from './email.service';

const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET || 'fallback_access_secret', { expiresIn: '15m' });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret', { expiresIn: '7d' });
};

export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email is already in use', 400, 'EMAIL_IN_USE');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const { token, hashedToken } = generateToken();
  const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const user = await User.create({
    name,
    email,
    passwordHash,
    emailVerifyToken: hashedToken,
    emailVerifyExpires,
  });

  // Fire and forget email sending
  sendVerificationEmail(user.email, token).catch(console.error);

  return { message: 'Registration successful. Please check your email to verify your account.' };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  if (!user.emailVerified) {
    throw new AppError('Please verify your email before logging in', 403, 'EMAIL_NOT_VERIFIED');
  }

  // Calculate streak logic here (simple version for now: update lastActiveDate)
  user.lastActiveDate = new Date();
  await user.save();

  const accessToken = generateAccessToken(user._id as string);
  const refreshToken = generateRefreshToken(user._id as string);

  return { 
    user: { id: user._id, name: user.name, email: user.email, streak: user.streak, avatar: user.avatar },
    accessToken, 
    refreshToken 
  };
};

export const verifyEmail = async (token: string) => {
  const hashedToken = require('crypto').createHash('sha256').update(token).digest('hex');
  
  const user = await User.findOne({ 
    emailVerifyToken: hashedToken, 
    emailVerifyExpires: { $gt: Date.now() } 
  });

  if (!user) {
    throw new AppError('Invalid or expired verification token', 400, 'INVALID_TOKEN');
  }

  user.emailVerified = true;
  user.emailVerifyToken = undefined;
  user.emailVerifyExpires = undefined;
  await user.save();

  return { message: 'Email verified successfully' };
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    // Return generic message to prevent email enumeration
    return { message: 'If that email is registered, we have sent a password reset link.' };
  }

  const { token, hashedToken } = generateToken();
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  await user.save();

  sendPasswordResetEmail(user.email, token).catch(console.error);

  return { message: 'If that email is registered, we have sent a password reset link.' };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const hashedToken = require('crypto').createHash('sha256').update(token).digest('hex');
  
  const user = await User.findOne({ 
    passwordResetToken: hashedToken, 
    passwordResetExpires: { $gt: Date.now() } 
  });

  if (!user) {
    throw new AppError('Invalid or expired reset token', 400, 'INVALID_TOKEN');
  }

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return { message: 'Password reset successful. You can now log in with your new password.' };
};

export const refreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret') as { userId: string };
    const accessToken = generateAccessToken(decoded.userId);
    return { accessToken };
  } catch (error) {
    throw new AppError('Invalid refresh token', 401, 'UNAUTHORIZED');
  }
};
