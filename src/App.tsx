
import DocumentExtractor from './components/DocumentExtractor';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistema di Estrazione Dati da Documenti
          </h1>
          <p className="text-gray-600 mt-1">
            Carica un documento (DDT o Fattura) per estrarre automaticamente i dati strutturati
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DocumentExtractor />
      </main>
      
      <Toaster />
    </div>
  );
}

export default App;
