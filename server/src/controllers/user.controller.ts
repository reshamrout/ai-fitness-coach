import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';
import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    bio: z.string().optional(),
    avatar: z.string().url('Invalid URL').optional(),
  }),
});

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const user = await User.findById(userId).select('-passwordHash -emailVerifyToken -passwordResetToken');
    
    if (!user) {
      return next(new AppError('User not found', 404, 'NOT_FOUND'));
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select('-passwordHash -emailVerifyToken -passwordResetToken');

    if (!user) {
      return next(new AppError('User not found', 404, 'NOT_FOUND'));
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return next(new AppError('User not found', 404, 'NOT_FOUND'));
    }

    // Also delete plans and progress logs (cascade delete manually for simplicity)
    const { Plan } = require('../models/Plan');
    const { ProgressLog } = require('../models/ProgressLog');
    await Plan.deleteMany({ userId });
    await ProgressLog.deleteMany({ userId });

    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, data: { message: 'Account deleted successfully' } });
  } catch (error) {
    next(error);
  }
};
