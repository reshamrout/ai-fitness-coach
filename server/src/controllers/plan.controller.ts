import { Request, Response, NextFunction } from 'express';
import { Plan } from '../models/Plan';
import { User } from '../models/User';
import * as aiService from '../services/ai.service';
import { AppError } from '../utils/AppError';

export const generatePlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const formData = req.body;

    // Call Gemini API
    const generatedPlan = await aiService.generatePlan(formData);

    // Save to DB
    const plan = await Plan.create({
      userId,
      formData,
      workoutPlan: generatedPlan.workoutPlan,
      dietPlan: generatedPlan.dietPlan,
      aiTips: generatedPlan.aiTips,
    });

    // Update user stats
    await User.findByIdAndUpdate(userId, { $inc: { totalPlansGenerated: 1 } });

    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

export const getPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const { cursor, limit = '10' } = req.query;
    const parsedLimit = parseInt(limit as string, 10);

    let query: any = { userId };
    
    // Cursor pagination (assuming descending order by _id)
    if (cursor) {
      query._id = { $lt: cursor };
    }

    const plans = await Plan.find(query)
      .sort({ _id: -1 })
      .limit(parsedLimit + 1); // Fetch one extra to check for next page

    const hasNextPage = plans.length > parsedLimit;
    if (hasNextPage) {
      plans.pop(); // Remove the extra item
    }

    const nextCursor = hasNextPage ? plans[plans.length - 1]._id : null;

    res.status(200).json({ 
      success: true, 
      data: {
        plans,
        nextCursor
      } 
    });
  } catch (error) {
    next(error);
  }
};

export const getPlanById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const planId = req.params.id;

    const plan = await Plan.findOne({ _id: planId, userId });
    
    if (!plan) {
      return next(new AppError('Plan not found', 404, 'NOT_FOUND'));
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const planId = req.params.id;

    const result = await Plan.findOneAndDelete({ _id: planId, userId });
    
    if (!result) {
      return next(new AppError('Plan not found', 404, 'NOT_FOUND'));
    }

    res.status(200).json({ success: true, data: { message: 'Plan deleted successfully' } });
  } catch (error) {
    next(error);
  }
};

export const updatePlanLabel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const planId = req.params.id;
    const { label } = req.body;

    const plan = await Plan.findOneAndUpdate(
      { _id: planId, userId },
      { label },
      { new: true }
    );
    
    if (!plan) {
      return next(new AppError('Plan not found', 404, 'NOT_FOUND'));
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
};
