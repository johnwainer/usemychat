'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function TestSupabase() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();
        
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);

        if (error) {
          setStatus('error');
          setMessage(`Error: ${error.message}`);
          return;
        }

        const tableTests = [
          'profiles',
          'conversations',
          'messages',
          'contacts',
          'campaigns',
          'bots'
        ];

        const results = await Promise.all(
          tableTests.map(async (table) => {
            const { error } = await supabase.from(table).select('count').limit(1);
            return error ? null : table;
          })
        );

        const validTables = results.filter(Boolean) as string[];
        setTables(validTables);
        setStatus('success');
        setMessage(`Conexión exitosa! ${validTables.length}/6 tablas accesibles`);
      } catch (err) {
        setStatus('error');
        setMessage(`Error de conexión: ${err}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Test de Conexión Supabase
        </h1>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-4 h-4 rounded-full ${
                status === 'loading'
                  ? 'bg-yellow-500 animate-pulse'
                  : status === 'success'
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            />
            <span className="text-lg font-medium">
              {status === 'loading'
                ? 'Conectando...'
                : status === 'success'
                ? 'Conectado'
                : 'Error de conexión'}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{message}</p>
          </div>

          {tables.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Tablas disponibles:</h2>
              <ul className="space-y-2">
                {tables.map((table) => (
                  <li
                    key={table}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {table}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Volver al inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
