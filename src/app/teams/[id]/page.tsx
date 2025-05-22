import { notFound } from 'next/navigation';

type Player = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
};

type Team = {
  id: number;
  full_name: string;
};

type PageProps = {
  params: {
    id: string;
  };
};

async function getPlayers(teamId: string): Promise<Player[]> {
  const res = await fetch(
    `https://www.balldontlie.io/api/v1/players?team_ids[]=${teamId}&per_page=10`
  );

  if (!res.ok) throw new Error('Fehler beim Laden der Spieler');

  const data = await res.json();
  return data.data;
}

async function getTeam(teamId: string): Promise<Team | null> {
  const res = await fetch(`https://www.balldontlie.io/api/v1/teams/${teamId}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function TeamPage(props: PageProps) {
  const id = await props.params.id;

  const team = await getTeam(id);
  if (!team) return notFound();

  const players = await getPlayers(id);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">{team.full_name}</h2>
      <h3 className="text-xl mb-4">Spieler (max. 10):</h3>
      <ul className="space-y-2">
        {players.map((p) => (
          <li key={p.id} className="bg-white dark:bg-gray-800 p-3 rounded shadow">
            {p.first_name} {p.last_name} – Position: {p.position || 'Unbekannt'}
          </li>
        ))}
      </ul>
    </div>
  );
}