// import toast from 'react-hot-toast';

// const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
// const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // A default voice (Adam)

// export const playTextToSpeech = async (text) => {
//   const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`;
  
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'xi-api-key': API_KEY,
//       },
//       body: JSON.stringify({
//         text: text,
//         model_id: 'eleven_monolingual_v1',
//         voice_settings: {
//           stability: 0.5,
//           similarity_boost: 0.5,
//         },
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('ElevenLabs API request failed');
//     }

//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     const audioBuffer = await response.arrayBuffer();
//     const bufferSource = audioContext.createBufferSource();
    
//     bufferSource.buffer = await audioContext.decodeAudioData(audioBuffer);
//     bufferSource.connect(audioContext.destination);
//     bufferSource.start(0);

//     // Return a promise that resolves when audio finishes
//     return new Promise((resolve) => {
//       bufferSource.onended = () => {
//         audioContext.close();
//         resolve();
//       };
//     });

//   } catch (error) {
//     console.error('Error playing TTS:', error);
//     toast.error('Failed to play AI voice.');
//   }
// };

// src/api/elevenLabs.js

export const playTextToSpeech = async (text) => {
  // Call our new proxy endpoint
  const response = await fetch('/api/elevenlabs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text }),
  });

  if (!response.ok) {
    throw new Error('ElevenLabs API request failed');
  }

  // The audio playback logic is identical
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffer = await response.arrayBuffer();
  const bufferSource = audioContext.createBufferSource();
  
  bufferSource.buffer = await audioContext.decodeAudioData(audioBuffer);
  bufferSource.connect(audioContext.destination);
  bufferSource.start(0);

  return new Promise((resolve) => {
    bufferSource.onended = () => {
      audioContext.close();
      resolve();
    };
  });
};