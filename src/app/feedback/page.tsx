'use client';

import { useState } from 'react';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, team }),
    });

    if (res.ok) {
      setMessage('Feedback wurde gespeichert!');
      setName('');
      setTeam('');
    } else {
      setMessage('Fehler beim Senden');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Feedback Formular</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Dein Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Feedback"
          className="w-full p-2 border rounded"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Absenden
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
