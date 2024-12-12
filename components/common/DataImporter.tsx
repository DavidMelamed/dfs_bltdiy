import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

interface ImportStatus {
  status: 'idle' | 'uploading' | 'success' | 'error';
  message?: string;
  progress?: number;
}

export const DataImporter: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [importStatus, setImportStatus] = useState<ImportStatus>({ status: 'idle' });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Add validation here
    const validFiles = newFiles.filter(file => 
      file.type === 'text/csv' || 
      file.type === 'application/json' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    if (validFiles.length !== newFiles.length) {
      setImportStatus({
        status: 'error',
        message: 'Some files were rejected. Only CSV, JSON, and XLSX files are supported.'
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleImport = async () => {
    if (files.length === 0) return;

    setImportStatus({ status: 'uploading', progress: 0 });

    try {
      // Simulated upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setImportStatus({ status: 'uploading', progress: i });
      }

      // Add your actual import logic here

      setImportStatus({
        status: 'success',
        message: 'Files imported successfully!'
      });
      setFiles([]);
    } catch (error) {
      setImportStatus({
        status: 'error',
        message: 'Failed to import files. Please try again.'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Import Data</h2>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${files.length > 0 ? 'bg-gray-50' : 'hover:bg-gray-50'}
          transition-all cursor-pointer
        `}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          accept=".csv,.json,.xlsx"
          className="hidden"
        />

        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-sm text-gray-600">
          Drag and drop files here, or click to select files
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Supported formats: CSV, JSON, XLSX
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Selected Files</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Messages */}
      {importStatus.status !== 'idle' && (
        <div className={`mt-4 p-4 rounded-md ${
          importStatus.status === 'error' ? 'bg-red-50' :
          importStatus.status === 'success' ? 'bg-green-50' :
          'bg-blue-50'
        }`}>
          <div className="flex items-center">
            {importStatus.status === 'error' && (
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            )}
            {importStatus.status === 'success' && (
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            )}
            <p className={`text-sm ${
              importStatus.status === 'error' ? 'text-red-700' :
              importStatus.status === 'success' ? 'text-green-700' :
              'text-blue-700'
            }`}>
              {importStatus.message || 'Importing...'}
            </p>
          </div>
          {importStatus.status === 'uploading' && (
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${importStatus.progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Import Button */}
      {files.length > 0 && (
        <button
          onClick={handleImport}
          disabled={importStatus.status === 'uploading'}
          className={`
            mt-6 w-full flex items-center justify-center px-4 py-2
            border border-transparent rounded-md shadow-sm text-sm font-medium text-white
            ${importStatus.status === 'uploading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          `}
        >
          {importStatus.status === 'uploading' ? 'Importing...' : 'Start Import'}
        </button>
      )}
    </div>
  );
};

export default DataImporter;
