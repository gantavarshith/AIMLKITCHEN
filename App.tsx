import React, { useState, useEffect, useCallback } from 'react';
import { Recipe, RecipeSuggestion } from './types';
import { getRecipeSuggestions, getFullRecipe } from './services/recipeService';
import IngredientInput from './components/IngredientInput';
import RecipeSuggestions from './components/RecipeSuggestions';
import RecipeCard from './components/RecipeCard';
import CookModeView from './components/CookModeView';
import CookbookView from './components/CookbookView';
import Footer from './components/Footer';
import LogoIcon from './components/icons/LogoIcon';
import CookbookIcon from './components/icons/CookbookIcon';
import ArrowLeftIcon from './components/icons/ArrowLeftIcon';
import WarningIcon from './components/icons/WarningIcon';

type View = 'input' | 'suggestions' | 'recipe' | 'cookbook' | 'cookmode';

const App: React.FC = () => {
  const [view, setView] = useState<View>('input');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedRecipes = localStorage.getItem('cookbook');
      if (storedRecipes) {
        setSavedRecipes(JSON.parse(storedRecipes));
      }
    } catch (e) {
      console.error("Failed to load recipes from local storage", e);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    const isDishName = !query.includes(',') && query.split(/\s+/).length <= 5;

    if (isDishName) {
      setView('recipe');
      try {
        setIngredients([]);
        const recipeDetails = await getFullRecipe(query, []);
        setSelectedRecipe(recipeDetails);
      } catch (recipeError: any) {
        setError(recipeError.message || `Could not find a recipe for "${query}".`);
        setView('input');
      } finally {
        setIsLoading(false);
      }
    } else {
      const ings = query.split(',').map(i => i.trim()).filter(Boolean);
      setIngredients(ings);
      setView('suggestions');
      try {
        const newSuggestions = await getRecipeSuggestions(ings);
        setSuggestions(newSuggestions);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred while getting suggestions.');
        setView('input');
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const handleSelectSuggestion = useCallback(async (recipeName: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedRecipe(null);
    setView('recipe');
    try {
      const recipeDetails = await getFullRecipe(recipeName, ingredients);
      setSelectedRecipe(recipeDetails);
    } catch (recipeError: any)
     {
      setError(recipeError.message || 'An unknown error occurred.');
      setView('suggestions');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  const handleSaveRecipe = useCallback((recipe: Recipe) => {
    let updatedRecipes;
    if (savedRecipes.some(r => r.name === recipe.name)) {
      updatedRecipes = savedRecipes.filter(r => r.name !== recipe.name);
    } else {
      updatedRecipes = [...savedRecipes, recipe];
    }
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('cookbook', JSON.stringify(updatedRecipes));
  }, [savedRecipes]);
  
  const handleRemoveSavedRecipe = useCallback((recipeName: string) => {
    const updatedRecipes = savedRecipes.filter(r => r.name !== recipeName);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('cookbook', JSON.stringify(updatedRecipes));
  }, [savedRecipes]);

  const handleSelectSavedRecipe = useCallback((recipeName: string) => {
    const recipe = savedRecipes.find(r => r.name === recipeName);
    if (recipe) {
      setSelectedRecipe(recipe);
      setView('recipe');
    }
  }, [savedRecipes]);

  const resetToHome = () => {
    setView('input');
    setError(null);
    setSelectedRecipe(null);
    setSuggestions([]);
  };
  
  const handleBackFromRecipe = () => {
      if (suggestions.length > 0) {
          setView('suggestions');
      } else {
          setView('input');
      }
      setSelectedRecipe(null);
  }

  const renderContent = () => {
    if (error && (view === 'input' || view === 'suggestions')) {
        return (
            <div className="max-w-2xl mx-auto text-center p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg animate-fade-in-up">
                <div className="flex items-center justify-center">
                    <WarningIcon className="h-6 w-6 mr-3" />
                    <div>
                        <p className="font-bold">Oops, something went wrong!</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    switch (view) {
      case 'input':
        return <IngredientInput onSearch={handleSearch} isLoading={isLoading} />;
      case 'suggestions':
        return <RecipeSuggestions suggestions={suggestions} onSelectSuggestion={handleSelectSuggestion} onBack={() => setView('input')} isLoading={isLoading} />;
      case 'recipe':
        if (selectedRecipe) {
          return <RecipeCard 
            recipe={selectedRecipe} 
            onBack={handleBackFromRecipe} 
            onCookMode={() => setView('cookmode')}
            onSave={() => handleSaveRecipe(selectedRecipe)}
            isSaved={savedRecipes.some(r => r.name === selectedRecipe.name)}
            cameFromSuggestions={suggestions.length > 0}
          />;
        }
        return null;
      case 'cookmode':
        if (selectedRecipe) {
          return <CookModeView recipe={selectedRecipe} onExit={() => setView('recipe')} />;
        }
        return null;
      case 'cookbook':
        return <CookbookView savedRecipes={savedRecipes} onRemoveRecipe={handleRemoveSavedRecipe} onSelectRecipe={handleSelectSavedRecipe}/>
      default:
        return <IngredientInput onSearch={handleSearch} isLoading={isLoading} />;
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen text-brand-text font-sans flex flex-col">
      <header className="py-4 px-6 sticky top-0 bg-brand-bg/80 backdrop-blur-sm z-10 border-b border-brand-border">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={resetToHome} className="flex items-center gap-2 text-xl font-bold font-heading text-brand-text hover:opacity-80 transition-opacity">
            <LogoIcon className="h-8 w-8 text-brand-accent" />
            <span>AIML Kitchen</span>
          </button>
          
          <div>
            {view !== 'input' && view !== 'cookbook' && (
              <button onClick={() => setView('input')} className="mr-4 p-2 rounded-full hover:bg-brand-surface transition-colors" aria-label="Back to search">
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
            )}
            <button onClick={() => setView('cookbook')} className="p-2 rounded-full hover:bg-brand-surface transition-colors" aria-label="Open cookbook">
                <CookbookIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <main className="p-4 sm:p-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
