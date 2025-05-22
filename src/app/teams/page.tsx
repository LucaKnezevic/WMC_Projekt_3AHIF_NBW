import Link from 'next/link';

type Team = {
  id: number;
  full_name: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
};

async function getTeams(): Promise<Team[]> {
  const res = await fetch('http://localhost:3000/api/teams', {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('API-Request fehlgeschlagen');
  }

  const data = await res.json();
  return data.data;
}

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">NBA Teams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link href={`/teams/${team.id}`} key={team.id}>
            <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow hover:scale-105 transition cursor-pointer">
              <h3 className="text-xl font-bold">{team.full_name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {team.city} – {team.abbreviation}
              </p>
              <p className="text-sm">Conference: {team.conference}</p>
              <p className="text-sm">Division: {team.division}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
