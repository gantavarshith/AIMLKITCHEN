import React from 'react';
import { Recipe } from '../types';
import ChatPanel from './ChatPanel';
import BookmarkIcon from './icons/BookmarkIcon';
import ChefIcon from './icons/ChefIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import CheckIcon from './icons/CheckIcon';

interface RecipeCardProps {
  recipe: Recipe;
  onBack: () => void;
  onCookMode: () => void;
  onSave: () => void;
  isSaved: boolean;
  cameFromSuggestions: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onBack, onCookMode, onSave, isSaved, cameFromSuggestions }) => {
  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="flex items-center gap-2 mb-6 text-sm font-medium text-brand-text-secondary hover:text-brand-text transition-colors">
        <ArrowLeftIcon className="h-4 w-4" />
        {cameFromSuggestions ? 'Back to Suggestions' : 'Back to Search'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden border border-brand-border">
            <div className="p-6">
              <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-2">{recipe.name}</h1>
              <p className="text-brand-text-secondary mb-6">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 text-center">
                <div className="flex-1 min-w-[100px] bg-brand-bg/50 p-3 rounded-lg">
                  <p className="font-bold text-lg">{recipe.prepTime}</p>
                  <p className="text-sm text-brand-text-secondary">Prep Time</p>
                </div>
                <div className="flex-1 min-w-[100px] bg-brand-bg/50 p-3 rounded-lg">
                  <p className="font-bold text-lg">{recipe.cookTime}</p>
                  <p className="text-sm text-brand-text-secondary">Cook Time</p>
                </div>
                <div className="flex-1 min-w-[100px] bg-brand-bg/50 p-3 rounded-lg">
                  <p className="font-bold text-lg">{recipe.servings}</p>
                  <p className="text-sm text-brand-text-secondary">Servings</p>
                </div>
                {recipe.calorieCount && (
                  <div className="flex-1 min-w-[100px] bg-brand-bg/50 p-3 rounded-lg">
                    <p className="font-bold text-lg">{recipe.calorieCount}</p>
                    <p className="text-sm text-brand-text-secondary">Calories/Serving</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold font-heading mb-4 border-b-2 border-brand-accent pb-2">Ingredients</h2>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ing, index) => (
                      <li key={index} className="flex gap-2">
                        <CheckIcon className="h-5 w-5 mt-0.5 text-brand-accent flex-shrink-0"/>
                        <span><strong>{ing.quantity}</strong> {ing.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-3">
                  <h2 className="text-2xl font-bold font-heading mb-4 border-b-2 border-brand-accent pb-2">Instructions</h2>
                  <ol className="space-y-4">
                    {recipe.instructions.sort((a, b) => a.step - b.step).map((instr) => (
                      <li key={instr.step} className="flex gap-3">
                        <div className="flex-shrink-0 bg-brand-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">{instr.step}</div>
                        <p>{instr.instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {recipe.tips && recipe.tips.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold font-heading mb-4 border-b-2 border-brand-accent pb-2">Tips & Tricks</h2>
                  <ul className="space-y-3">
                    {recipe.tips.map((tip, index) => (
                       <li key={index} className="flex gap-3 items-start">
                        <LightbulbIcon className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <p>{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24">
            <div className="flex flex-col gap-4">
               <button onClick={onCookMode} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white text-lg font-bold rounded-lg hover:bg-brand-primary/90 transition-colors">
                 <ChefIcon className="h-6 w-6" />
                 Start Cooking
               </button>
               <button onClick={onSave} className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-lg border-2 transition-colors ${isSaved ? 'bg-brand-accent/20 border-brand-accent text-brand-accent' : 'border-brand-border hover:bg-brand-surface text-brand-text-secondary hover:text-brand-text'}`}>
                 <BookmarkIcon className="h-6 w-6" />
                 {isSaved ? 'Saved to Cookbook' : 'Save to Cookbook'}
               </button>
            </div>
            <ChatPanel recipe={recipe} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
