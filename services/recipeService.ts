import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, RecipeSuggestion, ChatMessage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

const recipeSuggestionsSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: 'The name of the recipe.',
            },
            description: {
                type: Type.STRING,
                description: 'A brief, one-sentence description of the recipe that sounds appealing.',
            },
        },
        required: ['name', 'description'],
    },
};

const fullRecipeSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING },
        description: { type: Type.STRING },
        ingredients: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    quantity: { type: Type.STRING },
                },
                required: ['name', 'quantity'],
            },
        },
        instructions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.INTEGER },
                    instruction: { type: Type.STRING },
                },
                required: ['step', 'instruction'],
            },
        },
        prepTime: { type: Type.STRING },
        cookTime: { type: Type.STRING },
        servings: { type: Type.STRING },
        tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        calorieCount: { type: Type.NUMBER },
    },
    required: ['name', 'description', 'ingredients', 'instructions', 'prepTime', 'cookTime', 'servings'],
};

export async function getRecipeSuggestions(ingredients: string[]): Promise<RecipeSuggestion[]> {
  try {
    const prompt = `Based *primarily* on the following ingredients, suggest 3-5 creative and delicious recipe ideas. Prioritize recipes where the provided ingredients are the main components. Include a variety of international cuisines (like Indian, Chinese, Thai, Italian, Mexican, etc.). For each recipe, provide a name and a short, enticing description. Ingredients: ${ingredients.join(', ')}.`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: recipeSuggestionsSchema,
        },
    });

    const jsonText = response.text.trim();
    const suggestions = JSON.parse(jsonText);
    return suggestions;
  } catch (error) {
    console.error("Error getting recipe suggestions:", error);
    throw new Error("Failed to get recipe suggestions. The AI model might be busy, please try again.");
  }
}

export async function getFullRecipe(recipeName: string, ingredients: string[]): Promise<Recipe> {
    try {
        const context = ingredients.length > 0 ? `I have these ingredients available: ${ingredients.join(', ')}.` : '';
        const prompt = `Generate a detailed recipe for "${recipeName}". ${context} Please provide the full recipe details, including a list of all required ingredients (not just the ones I have), step-by-step instructions, prep time, cook time, number of servings, and a few useful tips. Also include an estimated calorie count per serving if possible.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: fullRecipeSchema,
            },
        });

        const jsonText = response.text.trim();
        const recipeData = JSON.parse(jsonText);
        return recipeData as Recipe;

    } catch (error) {
        console.error(`Error getting full recipe for ${recipeName}:`, error);
        throw new Error("Failed to generate the full recipe. The model might be busy, please try again.");
    }
}

export async function getChatResponse(history: ChatMessage[], recipe: Recipe): Promise<string> {
    try {
        const systemInstruction = `You are a helpful and friendly kitchen assistant. The user is currently viewing a recipe for "${recipe.name}". Your answers should be concise and directly related to this recipe unless the user asks for something else. Do not repeat the recipe instructions unless asked. Recipe context: ${JSON.stringify({ description: recipe.description, ingredients: recipe.ingredients, instructions: recipe.instructions, tips: recipe.tips })}`;

        const contents = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        return response.text;
    } catch (error) {
        console.error("Error getting chat response:", error);
        throw new Error("Sorry, I'm having trouble responding right now.");
    }
}
