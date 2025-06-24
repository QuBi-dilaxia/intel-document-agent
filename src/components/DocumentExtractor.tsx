
import { useState } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import DocumentUpload from './DocumentUpload';
import ExtractedDataDisplay from './ExtractedDataDisplay';
import { ExtractedData } from '../types/document';

export default function DocumentExtractor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setExtractedData(null);

    try {
      // Simulazione chiamata API al backend Django
      toast({
        title: "Documento caricato",
        description: `Analizzando ${file.name}...`,
      });

      // Simula il tempo di elaborazione dell'AI
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Dati mock estratti (in produzione verranno dal backend)
      const mockData: ExtractedData = {
        datiGenerali: {
          ragioneSocialeFornitore: "ACME Forniture S.r.l.",
          numeroDocumento: "DDT-2024-001234",
          dataDocumento: "2024-06-24",
          tipoDocumento: "DDT"
        },
        dettagli: [
          {
            codiceArticolo: "ART-001",
            quantita: 10,
            descrizioneArticolo: "Viti acciaio inox M6x20",
            prezzoUnitario: 2.50,
            scontoMaggiorazione: -5,
            prezzoTotale: 23.75
          },
          {
            codiceArticolo: "ART-002",
            quantita: 5,
            descrizioneArticolo: "Rondelle acciaio Ø6mm",
            prezzoUnitario: 0.30,
            scontoMaggiorazione: 0,
            prezzoTotale: 1.50
          },
          {
            codiceArticolo: "ART-003",
            quantita: 2,
            descrizioneArticolo: "Bulloni M8x40 classe 8.8",
            prezzoUnitario: 3.20,
            scontoMaggiorazione: 10,
            prezzoTotale: 7.04
          }
        ]
      };

      setExtractedData(mockData);
      
      toast({
        title: "Estrazione completata",
        description: "I dati sono stati estratti con successo dal documento.",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'estrazione dei dati.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setExtractedData(null);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-8">
      {/* Area di Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Carica Documento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentUpload
            onFileUpload={handleFileUpload}
            isProcessing={isProcessing}
            uploadedFile={uploadedFile}
            onReset={handleReset}
          />
        </CardContent>
      </Card>

      {/* Stato di Elaborazione */}
      {isProcessing && (
        <Card>
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <div className="text-center">
                <h3 className="text-lg font-semibold">Elaborazione in corso...</h3>
                <p className="text-gray-600">
                  L'agente AI sta analizzando il documento e estraendo i dati strutturati
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dati Estratti */}
      {extractedData && (
        <ExtractedDataDisplay data={extractedData} />
      )}
    </div>
  );
}
