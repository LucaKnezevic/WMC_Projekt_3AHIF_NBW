'use client';
import { BalldontlieAPI } from '@balldontlie/sdk';
import { useEffect, useState } from 'react';

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

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<string>('A');

  useEffect(() => {
    async function fetchAllPlayers() {
      try {
        let allPlayers: Player[] = [];
        let cursor: number | null = 0;
        let count = 0;

        // ❗ Lade nur 2 Seiten = max. 200 Spieler
        while (cursor !== null && count < 2) {
          const res: any = await api.nba.getPlayers({ per_page: 100, cursor });
          allPlayers = [...allPlayers, ...res.data];
          cursor = res.meta.next_cursor ?? null;
          count++;
        }

        setPlayers(allPlayers);
      } catch (err) {
        console.error('Fehler beim Laden der Spieler:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPlayers();
  }, []);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const filteredPlayers = players
    .filter((p) => p.last_name.toUpperCase().startsWith(selectedLetter))
    .sort((a, b) => a.last_name.localeCompare(b.last_name));

  if (loading) return <p className="p-4">Spieler werden geladen...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">
        NBA-Spieler mit Nachnamen „{selectedLetter}“
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`px-3 py-1 rounded ${
              selectedLetter === letter
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {filteredPlayers.length === 0 ? (
        <p className="text-gray-500">Keine Spieler mit {selectedLetter} gefunden.</p>
      ) : (
        <ul className="space-y-2">
          {filteredPlayers.map((p) => (
            <li
              key={p.id}
              className="bg-white dark:bg-gray-800 p-3 rounded shadow"
            >
              {p.first_name} {p.last_name} – Position: {p.position || 'Unbekannt'}, Team:{' '}
              {p.team?.full_name || 'Unbekannt'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
