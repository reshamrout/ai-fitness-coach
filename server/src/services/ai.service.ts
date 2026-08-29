import { AppError } from '../utils/AppError';

const buildPrompt = (data: any) => {
  return `
    You are the OptiFit AI, an elite-level fitness and nutrition coach.
    A user has provided the following details:
    - Name: ${data.name}
    - Age: ${data.age}, Gender: ${data.gender}
    - Height: ${data.height} cm, Weight: ${data.weight} kg
    - Fitness Goal: ${data.goal}
    - Current Level: ${data.level}
    - Workout Location: ${data.location}
    - Dietary Preference: ${data.diet}
    - Optional Info (Medical, Stress): ${data.medical || 'Not provided'}

    Your task is to generate a comprehensive, personalized 7-day workout and diet plan.
    You MUST respond with ONLY a valid JSON object. Do not include any text, greetings, or explanations before or after the JSON block.
    
    The JSON structure MUST be exactly as follows:

    {
      "workoutPlan": [
        {
          "day": "Day 1",
          "focus": "Full Body Strength",
          "routine": [
            { "exercise": "Squats", "sets": 3, "reps": "10-12", "rest": "60s" },
            { "exercise": "Push-ups", "sets": 3, "reps": "As many as possible", "rest": "60s" },
            { "exercise": "Plank", "sets": 3, "reps": "60s", "rest": "60s" }
          ]
        },
        { "day": "Day 2", "focus": "Cardio", "routine": [...] },
        { "day": "Day 3", "focus": "Upper Body", "routine": [...] },
        { "day": "Day 4", "focus": "Lower Body", "routine": [...] },
        { "day": "Day 5", "focus": "Full Body Circuit", "routine": [...] },
        { "day": "Day 6", "focus": "Active Recovery", "routine": [...] },
        { "day": "Day 7", "focus": "Rest", "routine": [] }
      ],
      "dietPlan": [
        {
          "day": "Day 1",
          "meals": {
            "breakfast": "Oatmeal with berries and nuts",
            "lunch": "Grilled Chicken Salad with vinaigrette",
            "dinner": "Salmon with quinoa and roasted vegetables",
            "snack": "Greek yogurt"
          }
        },
        {
          "day": "Day 2",
          "meals": { ... }
        },
        { "day": "Day 3", "meals": { ... } },
        { "day": "Day 4", "meals": { ... } },
        { "day": "Day 5", "meals": { ... } },
        { "day": "Day 6", "meals": { ... } },
        { "day": "Day 7", "meals": { ... } }
      ],
      "aiTips": "Based on your goal of ${data.goal}, remember to prioritize consistent sleep and hydration. Given your ${data.level} level, focus on proper form before increasing weight. ..."
    }
  `;
};

export const generatePlan = async (formData: any) => {
  const API_KEY = process.env.GEMINI_API_KEY; 
  if (!API_KEY) throw new AppError('Gemini API key is not configured', 500, 'SERVER_ERROR');

  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const prompt = buildPrompt(formData);

  const apiResponse = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });

  if (!apiResponse.ok) {
    throw new AppError(`Gemini API failed with status: ${apiResponse.status}`, 502, 'BAD_GATEWAY');
  }

  const data = await apiResponse.json();
  const jsonText = data.candidates[0].content.parts[0].text
    .replace(/```json/g, '')
    .replace(/```/g, '');
    
  try {
    return JSON.parse(jsonText);
  } catch (error) {
    throw new AppError('Failed to parse AI response as JSON', 500, 'JSON_PARSE_ERROR');
  }
};

export const generateImage = async (prompt: string) => {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) throw new AppError('Gemini API key is not configured', 500, 'SERVER_ERROR');

  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${API_KEY}`;
  
  const safetySettings = [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ];

  const apiResponse = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      contents: [{ parts: [{ text: prompt }] }],
      safetySettings: safetySettings 
    }),
  });

  if (!apiResponse.ok) {
    throw new AppError(`Gemini Image API failed: ${apiResponse.status}`, 502, 'BAD_GATEWAY');
  }

  const data = await apiResponse.json();
  const image = data.candidates[0].content.parts[0].inlineData;
  
  if (!image) {
    throw new AppError('API did not return image data.', 500, 'NO_IMAGE_DATA');
  }

  return `data:${image.mimeType};base64,${image.data}`;
};

export const generateAudio = async (text: string) => {
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!API_KEY) throw new AppError('ElevenLabs API key is not configured', 500, 'SERVER_ERROR');

  const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; 
  const URL = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`;

  const apiResponse = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': API_KEY,
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_monolingual_v1',
    }),
  });

  if (!apiResponse.ok) {
    throw new AppError(`ElevenLabs API failed: ${apiResponse.status}`, 502, 'BAD_GATEWAY');
  }

  return await apiResponse.arrayBuffer();
};
