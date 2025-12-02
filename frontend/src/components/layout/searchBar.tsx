import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isSearching: boolean;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isSearching, isLoading }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const mapContainer = document.getElementById("map-container");
    if (mapContainer) {
      mapContainer.classList.remove("z-0");
    }

    console.log("Buscando:", inputValue);

    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <div className={`
      absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#0a0a0a]/70 backdrop-blur-sm transition-all duration-700
      ${isSearching ? 'opacity-0 pointer-events-none' : 'opacity-100'}
    `}>
      <div className="relative w-full max-w-xl px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-center mb-8 text-white transition-all duration-700">
          ¿A dónde quieres <span className="font-serif italic text-white/80">viajar?</span>
        </h2>

        <form
          onSubmit={handleSearch}
          className="relative group flex items-center bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 rounded-full h-16 w-full hover:border-white/20 transition-all duration-500 shadow-2xl"
        >
          <div className="flex-none w-16 h-16 flex items-center justify-center text-white/50">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            placeholder="Escribe tu destino..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 text-lg font-light tracking-wide pr-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />

          <div className="flex items-center gap-2 pr-2">
            <button
              type="submit"
              disabled={isLoading || !inputValue}
              className={`
                  p-3 rounded-full transition-all duration-500 flex items-center justify-center
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