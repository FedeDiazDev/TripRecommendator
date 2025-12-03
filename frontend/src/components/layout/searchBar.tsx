import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isSearching: boolean;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isSearching, isLoading }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (!isSearching && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isSearching]);
  
  useEffect(() => {
    if (isSearching) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const container = containerRef.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll<HTMLElement>(
        'textarea:not([disabled]), button:not([disabled])'
      );
      
      const focusableArray = Array.from(focusableElements).filter(el => el.tabIndex !== -1);
      
      if (focusableArray.length === 0) return;

      const firstElement = focusableArray[0];
      const lastElement = focusableArray[focusableArray.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
      else if (!container.contains(document.activeElement)) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearching]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <div 
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Barra de búsqueda de destinos"
      className={`
        absolute inset-0 flex flex-col items-center justify-center z-50 bg-base-black1/70 backdrop-blur-sm 
        transition-all duration-700 ease-in-out
        ${isSearching 
          ? 'opacity-0 scale-110'
          : 'opacity-100 scale-100'}
      `}
    >
      <div className="relative w-full max-w-xl px-6 flex flex-col items-center">
        
        <h2 className={`
            text-4xl md:text-6xl font-light tracking-tight text-center mb-8 text-white 
            transition-all duration-700 transform origin-center
            ${isSearching ? 'scale-125 blur-[2px]' : 'scale-100 blur-0'}
        `}>
          ¿A dónde quieres <span className="font-serif italic text-white/80">viajar?</span>
        </h2>

        <form
          onSubmit={handleSearch}
          className={`
            relative group flex items-center bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-full 
            h-14 md:h-16 w-full hover:border-white/20 shadow-2xl transition-all duration-700
            ${isSearching ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}
          `}
        >
          <div className="flex-none w-14 md:w-16 h-full flex items-center justify-center text-white/50">
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </div>

          <textarea
            ref={textareaRef}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 text-lg font-light tracking-wide pr-4 pt-5 resize-none overflow-y-auto h-16"
            placeholder="Escribe tu destino..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />

          <div className="flex items-center gap-2 pr-2">
            <button
              type="submit"
              disabled={isLoading || !inputValue}
              className={`
                  p-2 md:p-3 rounded-full transition-all duration-500 flex items-center justify-center
                  ${(inputValue && !isLoading) ?
                  'bg-white text-black rotate-0 opacity-100 hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)]' :
                  'bg-transparent text-transparent -rotate-90 opacity-0'}
              `}
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}