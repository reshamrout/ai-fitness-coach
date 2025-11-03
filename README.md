# 🤖 AI Fitness Coach

An AI-powered web application that generates personalized 7-day workout and diet plans using Google's Gemini API. Users input their personal details, fitness goals, and dietary preferences, and the app generates a comprehensive, AI-driven plan complete with exercise and meal visualizations.



## 🚀 Features

* **Personalized Profile:** Collects user details like age, gender, weight, height, fitness goal, and dietary needs.
* **AI Plan Generation:** Uses the **Google Gemini API** (`gemini-2.5-flash`) to create a complete 7-day workout and diet plan from a dynamic prompt.
* **AI Image Visualization:** Uses the **Google "Nano Banana" API** (`gemini-2.5-flash-image`) to generate images of exercises and meals on click.
* **Text-to-Speech:** Uses the **ElevenLabs API** to read the workout or diet plan out loud to the user.
* **Save & Export:**
    * Automatically saves the generated plan to **Local Storage** so it's there when you re-open the app.
    * Exports the complete plan as a **PDF** document.
* **Modern UI:**
    * Sleek, responsive design with **Tailwind CSS**.
    * **Dark / Light mode** toggle.
    * Smooth page transitions and component animations with **Framer Motion**.
    * Interactive tabs for easy day-by-day navigation.

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **AI (Text):** Google Gemini API (`gemini-2.5-flash`)
* **AI (Image):** Google Gemini API (`gemini-2.5-flash-image`)
* **AI (Voice):** ElevenLabs API
* **PDF Generation:** jsPDF
* **Notifications:** React Hot Toast
* **Icons:** React Icons
* **Deployment:** Vercel

## ⚙️ Setup and Installation

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone [https://github.com/reshamrout/ai-fitness-coach.git](https://github.com/reshamrout/ai-fitness-coach.git)
cd ai-fitness-coach
```

### 2. Install dependencies

```
npm install
```

### 3. Set up Environment Variables

This is the most important step. You must create a file named `.env` in the root of the project.

```
touch .env
```

Now, add your secret API keys to this file.

```env
# Get from Google AI Studio
VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Get from ElevenLabs website
VITE_ELEVENLABS_API_KEY="YOUR_ELEVENLABS_API_KEY"
```

### 4. Run the Development Server

```bash
npm run dev
```

The app should now be running on `http://localhost:5173/`.

## 🌐 Deployment

This project is configured for a seamless deployment to **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Vercel will automatically detect that this is a Vite project.
4.  The project uses Vercel Serverless Functions (the `/api` directory) to securely handle all API calls to Google and ElevenLabs.
5.  In your Vercel project settings, add your environment variables (from your `.env` file) so your deployed functions can use them.