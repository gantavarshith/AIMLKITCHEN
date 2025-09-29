
import React from 'react';
import { Recipe } from '../types';
import TrashIcon from './icons/TrashIcon';
import BookOpenIcon from './icons/BookOpenIcon';

interface CookbookViewProps {
  savedRecipes: Recipe[];
  onRemoveRecipe: (recipeName: string) => void;
  onSelectRecipe: (recipeName: string) => void;
}

const CookbookView: React.FC<CookbookViewProps> = ({ savedRecipes, onRemoveRecipe, onSelectRecipe }) => {
  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <BookOpenIcon className="h-16 w-16 mx-auto text-brand-primary mb-4" />
        <h2 className="text-3xl font-bold font-heading">My Cookbook</h2>
        <p className="text-brand-text-secondary mt-2">Your collection of saved recipes.</p>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="text-center bg-brand-bg/50 p-8 rounded-lg">
          <p className="text-lg text-brand-text-secondary">Your cookbook is empty.</p>
          <p className="mt-2 text-sm">Find a recipe you like and save it to see it here!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedRecipes.map(recipe => (
            <div key={recipe.name} className="bg-brand-surface/80 p-4 rounded-lg flex justify-between items-center border border-brand-border hover:border-brand-accent transition-colors">
              <div className="flex-1 cursor-pointer" onClick={() => onSelectRecipe(recipe.name)}>
                <h3 className="font-bold text-lg text-brand-text-primary">{recipe.name}</h3>
                <p className="text-sm text-brand-text-secondary">{recipe.description}</p>
              </div>
              <button
                onClick={() => onRemoveRecipe(recipe.name)}
                className="p-2 rounded-full hover:bg-red-100 text-brand-text-secondary hover:text-red-600 transition-colors flex-shrink-0 ml-4"
                aria-label={`Remove ${recipe.name}`}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CookbookView;
