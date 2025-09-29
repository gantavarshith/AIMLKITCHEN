
import React, { useState } from 'react';
import { Recipe } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface CookModeViewProps {
  recipe: Recipe;
  onExit: () => void;
}

const CookModeView: React.FC<CookModeViewProps> = ({ recipe, onExit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(recipe.instructions.length).fill(false)
  );

  const sortedInstructions = recipe.instructions.sort((a, b) => a.step - b.step);

  const handleNext = () => {
    if (currentStep < sortedInstructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const toggleStepCompletion = (index: number) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[index] = !newCompletedSteps[index];
    setCompletedSteps(newCompletedSteps);
  }

  const currentInstruction = sortedInstructions[currentStep];

  return (
    <div className="fixed inset-0 bg-brand-bg z-50 flex flex-col p-4 sm:p-8 animate-fade-in-up">
      <header className="flex justify-between items-center mb-4 sm:mb-8 flex-shrink-0">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">{recipe.name}</h1>
            <p className="text-brand-text-secondary">Cooking Mode</p>
        </div>
        <button onClick={onExit} className="flex items-center gap-2 px-4 py-2 bg-brand-surface rounded-lg hover:bg-red-100/50 hover:text-red-500 transition-colors">
          <XIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto">
        <div className="lg:col-span-2 bg-brand-surface rounded-lg p-6 sm:p-8 flex flex-col">
            <div className="mb-4">
                <span className="text-brand-accent font-bold">STEP {currentInstruction.step} OF {sortedInstructions.length}</span>
                <div className="w-full bg-brand-bg/50 rounded-full h-2.5 mt-2">
                    <div className="bg-brand-accent h-2.5 rounded-full" style={{ width: `${((currentStep + 1) / sortedInstructions.length) * 100}%` }}></div>
                </div>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed text-center font-medium">
                    {currentInstruction.instruction}
                </p>
            </div>
            <div className="flex justify-between items-center mt-6 flex-shrink-0">
                <button onClick={handlePrev} disabled={currentStep === 0} className="px-6 py-3 bg-brand-bg/80 rounded-lg disabled:opacity-50 hover:bg-brand-bg">Previous</button>
                <button onClick={() => toggleStepCompletion(currentStep)} className={`px-5 py-2 rounded-lg font-semibold border-2 transition-colors ${completedSteps[currentStep] ? 'bg-green-500/20 text-green-500 border-green-500' : 'border-brand-border'}`}>
                    {completedSteps[currentStep] ? 'Completed!' : 'Mark as Complete'}
                </button>
                <button onClick={handleNext} disabled={currentStep === sortedInstructions.length - 1} className="px-6 py-3 bg-brand-primary text-white rounded-lg disabled:opacity-50 hover:bg-brand-primary/90">Next</button>
            </div>
        </div>

        <div className="bg-brand-surface rounded-lg p-6 overflow-y-auto">
          <h2 className="text-xl font-bold font-heading mb-4">Ingredients</h2>
          <ul className="space-y-2 text-sm">
            {recipe.ingredients.map((ing, index) => (
              <li key={index} className="flex gap-2">
                <CheckIcon className="h-4 w-4 mt-0.5 text-brand-accent flex-shrink-0"/>
                <span><strong>{ing.quantity}</strong> {ing.name}</span>
              </li>
            ))}
          </ul>
           <h2 className="text-xl font-bold font-heading mt-6 mb-4">All Steps</h2>
            <ul className="space-y-2">
                {sortedInstructions.map((instr, index) => (
                    <li key={instr.step} onClick={() => setCurrentStep(index)} className={`p-2 rounded-md cursor-pointer transition-colors ${index === currentStep ? 'bg-brand-primary/20' : 'hover:bg-brand-bg/50'}`}>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={completedSteps[index]} onChange={() => toggleStepCompletion(index)} className="h-5 w-5 rounded text-brand-primary focus:ring-brand-accent"/>
                            <span className={`${completedSteps[index] ? 'line-through text-brand-text-secondary' : ''}`}>
                                <strong>Step {instr.step}:</strong> {instr.instruction.substring(0, 40)}...
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default CookModeView;
