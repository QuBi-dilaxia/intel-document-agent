
import { useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from './ui/button';

interface DocumentUploadProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
  uploadedFile: File | null;
  onReset: () => void;
}

export default function DocumentUpload({
  onFileUpload,
  isProcessing,
  uploadedFile,
  onReset
}: DocumentUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  if (uploadedFile) {
    return (
      <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center gap-3">
          <File className="h-8 w-8 text-blue-600" />
          <div>
            <p className="font-medium">{uploadedFile.name}</p>
            <p className="text-sm text-gray-600">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        
        {!isProcessing && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4 mr-1" />
            Rimuovi
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={triggerFileSelect}
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold mb-2">
        Carica un documento
      </h3>
      <p className="text-gray-600 mb-4">
        Trascina qui il file oppure clicca per selezionarlo
      </p>
      <p className="text-sm text-gray-500">
        Formati supportati: PDF, DOC, DOCX, JPG, PNG
      </p>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button className="mt-4" disabled={isProcessing}>
        Seleziona File
      </Button>
    </div>
  );
}
