// /api/gemini-plan.js

// This function builds the prompt, just like your old file
const buildPrompt = (data) => {
  return `
    You are an elite-level AI fitness and nutrition coach.
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

// This is the Vercel serverless function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const formData = req.body;
    const API_KEY = process.env.VITE_GEMINI_API_KEY; // Get key from Vercel env
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    
    const prompt = buildPrompt(formData);

    const apiResponse = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!apiResponse.ok) {
      throw new Error(`Gemini API failed with status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    
    // Clean and send the JSON text from the API
    const jsonText = data.candidates[0].content.parts[0].text
      .replace(/```json/g, '')
      .replace(/```/g, '');
      
    res.status(200).json(JSON.parse(jsonText));

  } catch (error) {
    console.error('Gemini plan proxy error:', error);
    res.status(500).json({ message: 'Error generating plan.' });
  }
}