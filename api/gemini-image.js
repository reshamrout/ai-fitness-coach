// /api/gemini-image.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;
    const API_KEY = process.env.VITE_GEMINI_API_KEY; // Use the same key
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${API_KEY}`;
    
    // Safety settings (as we used before)
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
      throw new Error(`Gemini Image API failed: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    const image = data.candidates[0].content.parts[0].inlineData;
    
    if (!image) {
      throw new Error('API did not return image data.');
    }

    // Send back the data URL
    res.status(200).json({ url: `data:${image.mimeType};base64,${image.data}` });

  } catch (error) {
    console.error('Gemini image proxy error:', error);
    res.status(500).json({ message: 'Error generating image.' });
  }
}