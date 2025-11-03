
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
  return data.url; 
};