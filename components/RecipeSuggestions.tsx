
import React from 'react';
import { RecipeSuggestion } from '../types';
import CircularProgress from './CircularProgress';
import LightbulbIcon from './icons/LightbulbIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface RecipeSuggestionsProps {
  suggestions: RecipeSuggestion[];
  onSelectSuggestion: (recipeName: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

const RecipeSuggestions: React.FC<RecipeSuggestionsProps> = ({ suggestions, onSelectSuggestion, onBack, isLoading }) => {
  if (isLoading && suggestions.length === 0) {
    return (
      <div className="text-center">
        <CircularProgress />
        <p className="mt-4 text-brand-text-secondary">Generating creative ideas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 mr-4 rounded-full hover:bg-brand-surface">
            <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div>
            <h2 className="text-3xl font-bold font-heading">Recipe Ideas</h2>
            <p className="text-brand-text-secondary">Here are a few suggestions from AIML Kitchen.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.name}
            className="bg-brand-surface p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:border-brand-accent border border-transparent transition-all"
            onClick={() => onSelectSuggestion(suggestion.name)}
          >
            <h3 className="text-xl font-bold text-brand-primary">{suggestion.name}</h3>
            <p className="mt-2 text-brand-text-secondary">{suggestion.description}</p>
          </div>
        ))}
        {isLoading && (
            <div className="text-center bg-brand-surface p-6 rounded-lg shadow-md">
                <CircularProgress />
                <p className="mt-4 text-brand-text-secondary">Fetching recipe details...</p>
            </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-lg flex items-start gap-3">
        <LightbulbIcon className="h-6 w-6 text-brand-primary flex-shrink-0 mt-1" />
        <p className="text-brand-text-secondary">
          <strong>Tip:</strong> Don't see what you're looking for? Try adding more ingredients or going back to be more specific.
        </p>
      </div>
    </div>
  );
};

export default RecipeSuggestions;
