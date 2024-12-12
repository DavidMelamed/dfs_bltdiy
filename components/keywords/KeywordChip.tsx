import React from 'react';

interface KeywordChipProps {
  keyword: string;
  volume?: number;
  difficulty?: number;
  onRemove?: () => void;
}

export const KeywordChip: React.FC<KeywordChipProps> = ({
  keyword,
  volume,
  difficulty,
  onRemove
}) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
      <span className="font-medium">{keyword}</span>
      {volume && <span className="text-gray-600">Vol: {volume}</span>}
      {difficulty && <span className="text-gray-600">KD: {difficulty}</span>}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}
    </div>
  );
};
