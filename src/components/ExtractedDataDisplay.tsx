
import { CheckCircle, FileText, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ExtractedData } from '../types/document';

interface ExtractedDataDisplayProps {
  data: ExtractedData;
}

export default function ExtractedDataDisplay({ data }: ExtractedDataDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  const totaleDocumento = data.dettagli.reduce((sum, item) => sum + item.prezzoTotale, 0);

  return (
    <div className="space-y-6">
      {/* Header con successo */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">
                Dati estratti con successo
              </h3>
              <p className="text-green-700">
                L'agente AI ha completato l'analisi del documento
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dati Generali */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dati Generali
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Ragione Sociale Fornitore
              </label>
              <p className="text-lg font-semibold mt-1">
                {data.datiGenerali.ragioneSocialeFornitore}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">
                Numero Documento
              </label>
              <p className="text-lg font-semibold mt-1">
                {data.datiGenerali.numeroDocumento}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">
                Data Documento
              </label>
              <p className="text-lg font-semibold mt-1">
                {formatDate(data.datiGenerali.dataDocumento)}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">
                Tipo Documento
              </label>
              <div className="mt-1">
                <Badge 
                  variant={data.datiGenerali.tipoDocumento === 'Fattura' ? 'default' : 'secondary'}
                  className="text-sm"
                >
                  {data.datiGenerali.tipoDocumento}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dettagli Articoli */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Dettagli Articoli ({data.dettagli.length} articoli)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.dettagli.map((articolo, index) => (
              <div key={index}>
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 p-4 rounded-lg bg-gray-50">
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Codice
                    </label>
                    <p className="font-mono text-sm font-semibold mt-1">
                      {articolo.codiceArticolo}
                    </p>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Descrizione
                    </label>
                    <p className="text-sm font-medium mt-1">
                      {articolo.descrizioneArticolo}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Quantità
                    </label>
                    <p className="text-sm font-semibold mt-1">
                      {articolo.quantita}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Prezzo Unitario
                    </label>
                    <p className="text-sm font-semibold mt-1">
                      {formatCurrency(articolo.prezzoUnitario)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      Totale
                    </label>
                    <p className="text-sm font-bold text-blue-600 mt-1">
                      {formatCurrency(articolo.prezzoTotale)}
                    </p>
                  </div>
                  
                  {articolo.scontoMaggiorazione !== 0 && (
                    <div className="lg:col-span-6 mt-2">
                      <Badge 
                        variant={articolo.scontoMaggiorazione > 0 ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {articolo.scontoMaggiorazione > 0 ? 'Sconto' : 'Maggiorazione'}: {Math.abs(articolo.scontoMaggiorazione)}%
                      </Badge>
                    </div>
                  )}
                </div>
                
                {index < data.dettagli.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
          
          {/* Totale Documento */}
          <div className="mt-6 pt-4 border-t-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Totale Documento:</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(totaleDocumento)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
