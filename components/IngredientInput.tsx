import React, { useState } from 'react';
import ChefIcon from './icons/ChefIcon';

interface IngredientInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const popularIngredients = ['Chicken Breast', 'Tomatoes', 'Rice', 'Pasta', 'Onion', 'Garlic', 'Cheese', 'Eggs'];

const IngredientInput: React.FC<IngredientInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handlePopularIngredientClick = (ingredient: string) => {
    setQuery(prev => prev ? `${prev}, ${ingredient}` : ingredient);
  };

  return (
    <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
      <ChefIcon className="h-20 w-20 mx-auto text-brand-accent mb-4" />
      <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4 text-brand-text">Unlock Your Next Meal</h1>
      <p className="text-xl font-medium mb-8 text-brand-text-secondary">
        Enter the ingredients you have, or search for a specific dish.
      </p>

      <form onSubmit={handleSubmit} className="bg-brand-surface/80 backdrop-blur-sm p-6 rounded-lg border border-brand-border shadow-2xl">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., chicken, rice, broccoli"
          className="w-full px-4 py-3 h-28 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent resize-none text-black placeholder:text-gray-500"
          disabled={isLoading}
        />

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-brand-text-secondary mb-3">Popular Ingredients</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularIngredients.map(ing => (
              <button
                key={ing}
                type="button"
                onClick={() => handlePopularIngredientClick(ing)}
                className="px-3 py-1 bg-brand-bg/60 border border-brand-border rounded-full text-sm text-brand-text-secondary hover:bg-brand-surface hover:text-brand-text transition-colors"
                disabled={isLoading}
              >
                {ing}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-4 bg-brand-primary text-white text-lg font-bold rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center shadow-lg"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Thinking...' : 'Find Recipes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IngredientInput;