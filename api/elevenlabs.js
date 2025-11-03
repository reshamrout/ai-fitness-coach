

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { text } = req.body;
    const API_KEY = process.env.VITE_ELEVENLABS_API_KEY;
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
      throw new Error(`ElevenLabs API failed: ${apiResponse.status}`);
    }

    const audioBuffer = await apiResponse.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error('ElevenLabs proxy error:', error);
    res.status(500).json({ message: 'Error generating audio.' });
  }
}