import { useState } from 'react';
import { apiClient } from './lib/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('Leche Soprole Entera Natural 1 L');

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Llamar al endpoint de scraping multi-retailer
      const data = await apiClient.post('/scrape/all', {
        product_name: searchTerm
      });

      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para determinar el precio más bajo
  const getCheapestPrice = () => {
    if (!results) return null;
    
    const prices = results
      .filter(r => r.encontrado)
      .map(r => {
        const priceStr = r.precio.replace('$', '').replace('.', '').replace(',', '');
        return { retailer: r.retailer, price: parseInt(priceStr) };
      })
      .filter(p => !isNaN(p.price));
    
    if (prices.length === 0) return null;
    
    const minPrice = Math.min(...prices.map(p => p.price));
    return prices.find(p => p.price === minPrice)?.retailer;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simplify
          </h1>
          <p className="text-xl text-gray-600">
            Comparador de precios: Jumbo, Santa Isabel y Líder
          </p>
        </div>

        {/* Card principal */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Buscar producto:
            </h2>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ej: Leche Soprole Entera Natural 1 L"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-700"
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleScrape()}
            />
            <p className="mt-2 text-sm text-gray-500">
              💡 Tip: Presiona Enter para buscar
            </p>
          </div>

          {/* Botón de scraping */}
          <button
            onClick={handleScrape}
            disabled={loading}
            className={`
              w-full py-4 px-6 rounded-lg font-semibold text-white text-lg
              transition-all duration-200 transform
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105 active:scale-95'
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Comparando precios en 3 supermercados...
              </span>
            ) : (
              '🔍 Comparar Precios en Jumbo, Santa Isabel y Líder'
            )}
          </button>

          {/* Tabla de resultados */}
          {results && results.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                📊 Comparación de Precios
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Supermercado</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Producto</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Precio</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">SKU</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => {
                      const isCheapest = result.retailer === getCheapestPrice() && result.encontrado;
                      return (
                        <tr 
                          key={index}
                          className={`
                            border-b border-gray-200
                            ${isCheapest ? 'bg-green-50' : 'hover:bg-gray-50'}
                          `}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <span className="font-semibold text-gray-900">
                                {result.retailer}
                              </span>
                              {isCheapest && (
                                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                                  Más barato
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`${result.encontrado ? 'text-gray-800' : 'text-gray-400'}`}>
                              {result.nombre}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`
                              text-xl font-bold
                              ${result.encontrado 
                                ? isCheapest ? 'text-green-600' : 'text-gray-900'
                                : 'text-red-500'
                              }
                            `}>
                              {result.precio}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-mono text-sm text-gray-600">
                              {result.sku}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {result.url && result.encontrado ? (
                              <a 
                                href={result.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                Ver producto →
                              </a>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Error
              </h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Info adicional */}
        <div className="max-w-2xl mx-auto mt-8 text-center text-gray-600">
          <p className="text-sm">
            Este es un ejemplo básico de scraping. El sistema busca el producto en Jumbo.cl y extrae su información.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

