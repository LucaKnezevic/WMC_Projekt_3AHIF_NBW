'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BalldontlieAPI } from '@balldontlie/sdk';

const api = new BalldontlieAPI({ apiKey: '9943c244-d2ba-4f98-a9cf-0277aff9be75' });

type Team = {
  id: number;
  full_name: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [selected, setSelected] = useState<'all' | 'east' | 'west'>('all');

  useEffect(() => {
    async function fetchTeams() {
      const res = await api.nba.getTeams();
      setTeams(res.data);
      setFilteredTeams(res.data);
    }

    fetchTeams();
  }, []);

  const filterTeams = (conference: 'all' | 'east' | 'west') => {
    setSelected(conference);
    if (conference === 'all') {
      setFilteredTeams(teams);
    } else {
      setFilteredTeams(
        teams.filter((team) => team.conference.toLowerCase() === conference)
      );
    }
  };

  const backgroundImage =
    selected === 'east'
      ? '/east.png'
      : selected === 'west'
      ? '/west.png'
      : '';

  return (
    <div
      className="min-h-screen bg-no-repeat bg-fixed px-6 py-12 flex justify-center items-start"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: '1350px', // ✅ nochmal 50% größer
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center', // ✅ bleibt zentriert
      }}
    >
      <div className="w-full max-w-7xl backdrop-blur-sm bg-white/80 dark:bg-black/70 rounded p-8 shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center">NBA Teams</h2>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          <button
            onClick={() => filterTeams('all')}
            className={`px-5 py-2 rounded ${
              selected === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            Alle
          </button>
          <button
            onClick={() => filterTeams('east')}
            className={`px-5 py-2 rounded ${
              selected === 'east'
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            East Conference
          </button>
          <button
            onClick={() => filterTeams('west')}
            className={`px-5 py-2 rounded ${
              selected === 'west'
                ? 'bg-red-700 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            West Conference
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <Link href={`/teams/${team.id}`} key={team.id}>
              <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow hover:scale-105 transition cursor-pointer">
                <h3 className="text-xl font-bold">{team.full_name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {team.city} – {team.abbreviation}
                </p>
                <p className="text-sm font-medium">Conference: {team.conference}</p>
                <p className="text-sm font-medium">Division: {team.division}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
