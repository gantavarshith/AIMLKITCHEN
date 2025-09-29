
export interface RecipeSuggestion {
  name: string;
  description: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface RecipeStep {
  step: number;
  instruction: string;
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: RecipeStep[];
  prepTime: string;
  cookTime: string;
  servings: string;
  tips?: string[];
  calorieCount?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}
