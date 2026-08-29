import mongoose, { Document, Schema } from 'mongoose';

export interface IExercise {
  exercise: string;
  sets: number | string;
  reps: string;
  rest: string;
}

export interface IWorkoutDay {
  day: string;
  focus: string;
  routine: IExercise[];
}

export interface IDietMeals {
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export interface IDietDay {
  day: string;
  meals: IDietMeals;
}

export interface IPlan extends Document {
  userId: mongoose.Types.ObjectId;
  label?: string;
  formData: any;
  workoutPlan: IWorkoutDay[];
  dietPlan: IDietDay[];
  aiTips: string;
  createdAt: Date;
}

const ExerciseSchema = new Schema<IExercise>({
  exercise: { type: String, required: true },
  sets: { type: Schema.Types.Mixed, required: true },
  reps: { type: String, required: true },
  rest: { type: String, required: true },
}, { _id: false });

const WorkoutDaySchema = new Schema<IWorkoutDay>({
  day: { type: String, required: true },
  focus: { type: String, required: true },
  routine: [ExerciseSchema],
}, { _id: false });

const DietMealsSchema = new Schema<IDietMeals>({
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  dinner: { type: String, required: true },
  snack: { type: String, required: true },
}, { _id: false });

const DietDaySchema = new Schema<IDietDay>({
  day: { type: String, required: true },
  meals: DietMealsSchema,
}, { _id: false });

const PlanSchema = new Schema<IPlan>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  label: { type: String },
  formData: { type: Schema.Types.Mixed, required: true },
  workoutPlan: [WorkoutDaySchema],
  dietPlan: [DietDaySchema],
  aiTips: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Plan = mongoose.model<IPlan>('Plan', PlanSchema);
