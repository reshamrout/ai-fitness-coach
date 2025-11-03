// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Get API key from .env
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// // Function to clean the AI's response
// const cleanJsonResponse = (text) => {
//   // Find the start and end of the JSON block
//   const jsonStart = text.indexOf('```json');
//   const jsonEnd = text.lastIndexOf('```');

//   if (jsonStart === -1 || jsonEnd === -1) {
//     // Fallback: assume the whole string is JSON, or try to find {}
//     const braceStart = text.indexOf('{');
//     const braceEnd = text.lastIndexOf('}');
//     if (braceStart === -1 || braceEnd === -1) {
//       throw new Error('No valid JSON object found in response.');
//     }
//     return text.substring(braceStart, braceEnd + 1);
//   }

//   // Extract the JSON string (remove the ```json and ```)
//   let jsonString = text.substring(jsonStart + 7, jsonEnd).trim();
//   return jsonString;
// };

// // The Master Prompt
// const buildPrompt = (data) => {
//   return `
//     You are an elite-level AI fitness and nutrition coach.
//     A user has provided the following details:
//     - Name: ${data.name}
//     - Age: ${data.age}, Gender: ${data.gender}
//     - Height: ${data.height} cm, Weight: ${data.weight} kg
//     - Fitness Goal: ${data.goal}
//     - Current Level: ${data.level}
//     - Workout Location: ${data.location}
//     - Dietary Preference: ${data.diet}
//     - Optional Info (Medical, Stress): ${data.medical || 'Not provided'}

//     Your task is to generate a comprehensive, personalized 7-day workout and diet plan.
//     You MUST respond with ONLY a valid JSON object. Do not include any text, greetings, or explanations before or after the JSON block.
    
//     The JSON structure MUST be exactly as follows:

//     {
//       "workoutPlan": [
//         {
//           "day": "Day 1",
//           "focus": "Full Body Strength",
//           "routine": [
//             { "exercise": "Squats", "sets": 3, "reps": "10-12", "rest": "60s" },
//             { "exercise": "Push-ups", "sets": 3, "reps": "As many as possible", "rest": "60s" },
//             { "exercise": "Plank", "sets": 3, "reps": "60s", "rest": "60s" }
//           ]
//         },
//         { "day": "Day 2", "focus": "Cardio", "routine": [...] },
//         { "day": "Day 3", "focus": "Upper Body", "routine": [...] },
//         { "day": "Day 4", "focus": "Lower Body", "routine": [...] },
//         { "day": "Day 5", "focus": "Full Body Circuit", "routine": [...] },
//         { "day": "Day 6", "focus": "Active Recovery", "routine": [...] },
//         { "day": "Day 7", "focus": "Rest", "routine": [] }
//       ],
//       "dietPlan": [
//         {
//           "day": "Day 1",
//           "meals": {
//             "breakfast": "Oatmeal with berries and nuts",
//             "lunch": "Grilled Chicken Salad with vinaigrette",
//             "dinner": "Salmon with quinoa and roasted vegetables",
//             "snack": "Greek yogurt"
//           }
//         },
//         {
//           "day": "Day 2",
//           "meals": { ... }
//         },
//         { "day": "Day 3", "meals": { ... } },
//         { "day": "Day 4", "meals": { ... } },
//         { "day": "Day 5", "meals": { ... } },
//         { "day": "Day 6", "meals": { ... } },
//         { "day": "Day 7", "meals": { ... } }
//       ],
//       "aiTips": "Based on your goal of ${data.goal}, remember to prioritize consistent sleep and hydration. Given your ${data.level} level, focus on proper form before increasing weight. ..."
//     }
//   `;
// };

// export const generateFullPlan = async (formData) => {
//   const prompt = buildPrompt(formData);

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let text = response.text();

//     console.log("Raw AI Response:", text); // For debugging
    
//     // Clean and parse the response
//     const jsonString = cleanJsonResponse(text);
//     const parsedPlan = JSON.parse(jsonString);
    
//     return parsedPlan;

//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     throw new Error('Failed to generate plan from AI.');
//   }
// };


// export const generateVisualImage = async (prompt) => {
//   try {
//     const imageModel = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash-image",
      
//       // --- ADD THESE SAFETY SETTINGS ---
//       // This tells the API to be less strict.
//       // We are asking for workout images, not dangerous content.
//       safetySettings: [
//         {
//           category: "HARM_CATEGORY_HARASSMENT",
//           threshold: "BLOCK_NONE",
//         },
//         {
//           category: "HARM_CATEGORY_HATE_SPEECH",
//           threshold: "BLOCK_NONE",
//         },
//         {
//           category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
//           threshold: "BLOCK_NONE",
//         },
//         {
//           category: "HARM_CATEGORY_DANGEROUS_CONTENT",
//           threshold: "BLOCK_NONE",
//         },
//       ],
//     });

//     const result = await imageModel.generateContent(prompt);
//     const response = await result.response;

//     // --- UPDATED ERROR CHECKING ---
//     const candidate = response.candidates?.[0];

//     if (!candidate) {
//       // Check if the whole response was blocked
//       const blockReason = response.promptFeedback?.blockReason;
//       if (blockReason) {
//         throw new Error(`Prompt blocked by safety filters: ${blockReason}`);
//       }
//       throw new Error("No candidates returned from API.");
//     }
    
//     // Check if the candidate itself was blocked
//     if (candidate.finishReason && candidate.finishReason !== "STOP") {
//        throw new Error(`Image generation stopped: ${candidate.finishReason}`);
//     }

//     const inlineDataParts = candidate.content.parts.filter(part => part.inlineData);

//     if (inlineDataParts.length === 0) {
//       // Check if it returned text instead
//       const textPart = candidate.content.parts.find(part => part.text);
//       if (textPart) {
//         console.warn("API returned text instead of an image:", textPart.text);
//       }
//       throw new Error("API did not return image data.");
//     }
//     // --- END OF UPDATED CHECKING ---

//     const image = inlineDataParts[0].inlineData;
//     return `data:${image.mimeType};base64,${image.data}`;

//   } catch (error) {
//     console.error('Error calling Gemini Image API:', error);
//     // Re-throw the specific error message
//     throw new Error(error.message || 'Failed to generate image from AI.');
//   }
// };

// src/api/gemini.js

// This function now calls our OWN API for the plan
export const generateFullPlan = async (formData) => {
  const response = await fetch('/api/gemini-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate plan from AI.');
  }
  return response.json();
};

// This function now calls our OWN API for the image
export const generateVisualImage = async (prompt) => {
  const response = await fetch('/api/gemini-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate image from AI.');
  }
  const data = await response.json();
  return data.url; // We return the data URL
};