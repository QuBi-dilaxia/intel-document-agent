
export interface DatiGenerali {
  ragioneSocialeFornitore: string;
  numeroDocumento: string;
  dataDocumento: string;
  tipoDocumento: 'DDT' | 'Fattura';
}

export interface DettaglioArticolo {
  codiceArticolo: string;
  quantita: number;
  descrizioneArticolo: string;
  prezzoUnitario: number;
  scontoMaggiorazione: number; // Percentuale: positivo = sconto, negativo = maggiorazione
  prezzoTotale: number;
}

export interface ExtractedData {
  datiGenerali: DatiGenerali;
  dettagli: DettaglioArticolo[];
}
