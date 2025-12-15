import { GoogleGenAI, Type } from "@google/genai";
import { TriviaQuestion } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Fallback data in case API fails or key is missing
const FALLBACK_TRIVIA: TriviaQuestion = {
  question: "What is the name of the Grinch's dog?",
  options: ["Max", "Rex", "Spot", "Buddy"],
  correctAnswer: "Max"
};

export const getFestiveTrivia = async (): Promise<TriviaQuestion> => {
  if (!apiKey) return FALLBACK_TRIVIA;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate one fun, multiple-choice Christmas trivia question for kids. The question should be simple and festive.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "4 possible answers"
            },
            correctAnswer: { type: Type.STRING, description: "The exact string from the options list that is correct" }
          },
          required: ["question", "options", "correctAnswer"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return FALLBACK_TRIVIA;
    return JSON.parse(jsonText) as TriviaQuestion;
  } catch (error) {
    console.error("Gemini API Error (Trivia):", error);
    return FALLBACK_TRIVIA;
  }
};
