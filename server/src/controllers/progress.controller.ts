import { Request, Response, NextFunction } from 'express';
import { ProgressLog } from '../models/ProgressLog';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';

export const logProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const { planId, date, completedExercises, mood, notes } = req.body;

    const log = await ProgressLog.create({
      userId,
      planId,
      date: new Date(date),
      completedExercises,
      mood,
      notes,
    });

    // Simple streak logic: check if there's a log from yesterday
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    const yesterdayLog = await ProgressLog.findOne({
      userId,
      date: { $gte: yesterday, $lte: endOfYesterday }
    });

    const updateObj: any = { lastActiveDate: new Date(date) };
    if (yesterdayLog) {
      updateObj.$inc = { streak: 1 };
    } else {
      // If it's a new day and no log yesterday, streak resets to 1
      updateObj.streak = 1;
    }

    await User.findByIdAndUpdate(userId, updateObj);

    res.status(201).json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

export const getProgressLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const logs = await ProgressLog.find({ userId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};

export const updateProgressLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const logId = req.params.id;
    const updates = req.body;

    const log = await ProgressLog.findOneAndUpdate(
      { _id: logId, userId },
      updates,
      { new: true }
    );
    
    if (!log) {
      return next(new AppError('Progress log not found', 404, 'NOT_FOUND'));
    }

    res.status(200).json({ success: true, data: log });
  } catch (error) {
    next(error);
  }
};

export const deleteProgressLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const logId = req.params.id;

    const result = await ProgressLog.findOneAndDelete({ _id: logId, userId });
    
    if (!result) {
      return next(new AppError('Progress log not found', 404, 'NOT_FOUND'));
    }

    res.status(200).json({ success: true, data: { message: 'Progress log deleted successfully' } });
  } catch (error) {
    next(error);
  }
};
