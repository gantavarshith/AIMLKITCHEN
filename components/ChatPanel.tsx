
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Recipe } from '../types';
import { getChatResponse } from '../services/recipeService';
import SendIcon from './icons/SendIcon';
import ChefIcon from './icons/ChefIcon';
import CircularProgress from './CircularProgress';
import ChatBubbleIcon from './icons/ChatBubbleIcon';

interface ChatPanelProps {
    recipe: Recipe;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ recipe }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([
            {
                id: `msg-init-${Date.now()}`,
                role: 'model',
                text: `Hi there! I'm your kitchen assistant. Feel free to ask me any questions about the ${recipe.name} recipe, like substitutions or clarification on a step.`
            }
        ]);
    }, [recipe.name]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { id: `msg-user-${Date.now()}`, role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await getChatResponse([...messages, userMessage], recipe);
            const modelMessage: ChatMessage = { id: `msg-model-${Date.now()}`, role: 'model', text: responseText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error: any) {
            const errorMessage: ChatMessage = { id: `msg-error-${Date.now()}`, role: 'model', text: error.message || "I'm sorry, I encountered an error." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="mt-6 bg-brand-surface rounded-lg shadow-lg flex flex-col h-[60vh] max-h-[500px]">
            <div className="p-4 border-b border-brand-border flex items-center gap-3">
                <ChatBubbleIcon className="h-6 w-6 text-brand-primary" />
                <h3 className="font-bold text-lg font-heading">Kitchen Assistant</h3>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {message.role === 'model' && <div className="flex-shrink-0 bg-brand-primary/20 rounded-full h-8 w-8 flex items-center justify-center"><ChefIcon className="h-5 w-5 text-brand-primary" /></div>}
                        <div className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-sm md:max-w-md ${message.role === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-brand-bg/80 text-brand-text-primary rounded-bl-none'}`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start items-end gap-2">
                       <div className="flex-shrink-0 bg-brand-primary/20 rounded-full h-8 w-8 flex items-center justify-center"><ChefIcon className="h-5 w-5 text-brand-primary" /></div>
                        <div className="px-4 py-2 rounded-2xl bg-brand-bg/80 text-brand-text-primary rounded-bl-none">
                            <CircularProgress />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-brand-border">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about substitutions..."
                        className="flex-grow w-full px-4 py-2 bg-brand-bg/50 border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        disabled={isLoading}
                    />
                    <button type="submit" className="p-3 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 disabled:opacity-50" disabled={isLoading || !input.trim()}>
                        <SendIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPanel;