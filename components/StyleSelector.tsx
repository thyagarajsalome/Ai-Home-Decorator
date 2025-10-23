import React from 'react';
import { DESIGN_STYLES } from '../constants';
import type { DesignStyle } from '../types';

interface StyleSelectorProps {
  onStyleSelect: (style: DesignStyle) => void;
  selectedStyle: DesignStyle | null;
  disabled: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ onStyleSelect, selectedStyle, disabled }) => {
  return (
    <div className={`w-full transition-opacity duration-300 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <h2 className="text-2xl font-bold text-gray-200">2. Choose a Style</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {DESIGN_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style)}
            className={`relative block w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 hover:border-purple-400 ${selectedStyle?.id === style.id ? 'border-purple-500 ring-2 ring-purple-500' : 'border-transparent'}`}
          >
            <img src={style.thumbnail} alt={style.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-end p-2">
              <p className="text-white font-semibold text-sm">{style.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;