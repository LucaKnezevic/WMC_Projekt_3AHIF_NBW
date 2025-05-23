'use client';
import { BalldontlieAPI } from '@balldontlie/sdk';
import { useState } from 'react';

const api = new BalldontlieAPI({ apiKey: '9943c244-d2ba-4f98-a9cf-0277aff9be75' });

type Player = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  team: {
    full_name: string;
  };
};

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [error, setError] = useState('');

  async function searchPlayer() {
    setError('');
    setPlayer(null);

    try {
      const res = await api.nba.getPlayers({ search, per_page: 1 });
      if (res.data.length === 0) {
        setError('Kein Spieler gefunden.');
      } else {
        setPlayer(res.data[0]);
      }
    } catch (err) {
      setError('Fehler bei der Suche.');
    }
  }

  return (
    
    <div className="max-w-xl mx-auto mt-10 px-4">
      
      <h1 className="text-5xl font-bold mb-6 text-center">
        NATIONAL BASKETBALL WEBSITE
      </h1>
      <p className="text-lg text-center">
        SUCHE DEINE LIEBLINGSSPIELER UND INFORMIERE DICH ÜBER DEINE LIEBLINGSTEAMS
      </p>


      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Spielername eingeben..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={searchPlayer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Suchen
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {player && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-4">
          <h2 className="text-xl font-bold mb-2">
            {player.first_name} {player.last_name}
          </h2>
          <p>
            <strong>Position:</strong>{' '}
            {player.position ? player.position : 'Keine Angabe'}
          </p>
          <p>
            <strong>Team:</strong> {player.team?.full_name || 'Unbekannt'}
          </p>
        </div>
      )}
    </div>
  );
}
