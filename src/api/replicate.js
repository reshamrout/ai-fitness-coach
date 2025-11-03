import toast from 'react-hot-toast';

// The REPLICATE_TOKEN is no longer needed here, 
// as the vite.config.js proxy is handling it.

// This helper function polls the Replicate API until the image is ready
const pollForPrediction = async (predictionUrl) => {
  // predictionUrl is "https://api.replicate.com/v1/predictions/abc..."
  // We must convert it to our proxy path: "/api/replicate/v1/predictions/abc..."
  
  const pollPath = new URL(predictionUrl).pathname; // Gets "/v1/predictions/abc..."
  const proxyUrl = `/api/replicate${pollPath}`;     // Creates "/api/replicate/v1/predictions/abc..."

  let prediction;
  do {
    // Wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const response = await fetch(proxyUrl, {
      method: 'GET', // Poll requests are GET
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Polling error:", errorText);
      throw new Error('Polling for image failed');
    }
    
    prediction = await response.json();
    
    if (prediction.status === 'failed') {
      throw new Error('Image generation failed');
    }

  } while (prediction.status !== 'succeeded');

  return prediction.output[0]; 
};

export const generateImage = async (prompt) => {
  try {
   
    const startResponse = await fetch('/api/replicate/v1/predictions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
       
      },
      body: JSON.stringify({
       
        version: "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
        input: { prompt: prompt },
      }),
    });

    if (!startResponse.ok) {
    
      const error = await startResponse.json(); 
      throw new Error(error.detail || 'Failed to start image generation');
    }

    const prediction = await startResponse.json();
    
    if (!prediction.urls || !prediction.urls.get) {
      console.error("Invalid response from Replicate:", prediction);
      throw new Error("Invalid response from image generation API.");
    }
    
    const imageUrl = await pollForPrediction(prediction.urls.get);
    return imageUrl;

  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};