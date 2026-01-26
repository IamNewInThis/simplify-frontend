import { useState } from 'react';
import { apiClient } from './lib/api';

function BrandSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [brandName, setBrandName] = useState('Soprole');

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await apiClient.get(`/brands/search?q=${encodeURIComponent(brandName)}`);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Buscar por marca:
        </h2>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Ej: Soprole, Nestle, Colun"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-gray-700"
          onKeyPress={(e) => e.key === 'Enter' && !loading && handleSearch()}
        />
        <p className="mt-2 text-sm text-gray-500">
          Busca todos los productos de una marca en Jumbo
        </p>
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold text-white text-lg
          transition-all duration-200 transform
          ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Buscando en Jumbo...
          </span>
        ) : (
          'Buscar productos de la marca'
        )}
      </button>

      {/* Resultado del scraping */}
      {results && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Resultado del scraping
          </h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-gray-700">
              <strong>Marca buscada:</strong> {results.brand}
            </p>
            <p className="text-gray-700">
              <strong>Estado:</strong> {results.status}
            </p>
            {results.message && (
              <p className="text-gray-600 mt-2">{results.message}</p>
            )}
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
  );
}

export default BrandSearch;
