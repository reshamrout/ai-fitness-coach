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
    - Optional Info: ${data.medical || 'Not provided'}

    You MUST respond with ONLY a valid JSON object exactly as follows:
    {
      "workoutPlan": [ ... 7 days ... ],
      "dietPlan": [ ... 7 days ... ],
      "aiTips": "Based on their goal..."
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