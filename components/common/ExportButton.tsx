import React from 'react';

interface ExportButtonProps {
  onExport: () => void;
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onExport, disabled = false }) => {
  return (
    <button
      onClick={onExport}
      disabled={disabled}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Export Data
    </button>
  );
};
