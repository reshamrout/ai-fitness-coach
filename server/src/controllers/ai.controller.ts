import { Request, Response, NextFunction } from 'express';
import * as aiService from '../services/ai.service';
import { z } from 'zod';

export const ttsSchema = z.object({
  body: z.object({
    text: z.string().min(1, 'Text is required'),
  }),
});

export const imageSchema = z.object({
  body: z.object({
    prompt: z.string().min(1, 'Prompt is required'),
  }),
});

export const chatSchema = z.object({
  body: z.object({
    message: z.string().min(1, 'Message is required'),
    history: z.array(z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })).optional(),
  }),
});

export const generateTTS = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req.body;
    const audioBuffer = await aiService.generateAudio(text);
    
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    next(error);
  }
};

export const generateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { prompt } = req.body;
    const imageUrl = await aiService.generateImage(prompt);
    res.status(200).json({ success: true, data: { url: imageUrl } });
  } catch (error) {
    next(error);
  }
};

export const chat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, history = [] } = req.body;
    
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) throw new Error('Gemini API key missing');

    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    
    const systemPrompt = `You are the OptiFit AI, an elite-level fitness and nutrition coach. Answer the user's questions clearly, concisely, and with a motivating tone. Keep responses under 3 paragraphs unless asked for a detailed plan.`;
    
    const contents = [
      ...history,
      { role: 'user', parts: [{ text: systemPrompt + '\n\nUser: ' + message }] }
    ];

    const apiResponse = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    if (!apiResponse.ok) {
      throw new Error(`Gemini Chat API failed with status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    const reply = data.candidates[0].content.parts[0].text;

    res.status(200).json({ success: true, data: { reply } });
  } catch (error) {
    next(error);
  }
};
