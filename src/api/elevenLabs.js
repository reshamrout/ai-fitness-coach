

export const playTextToSpeech = async (text) => {
 
  const response = await fetch('/api/elevenlabs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text }),
  });

  if (!response.ok) {
    throw new Error('ElevenLabs API request failed');
  }

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