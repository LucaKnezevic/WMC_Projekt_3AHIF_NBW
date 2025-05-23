import './globals.css';
import Link from 'next/link';
import Image from 'next/image'; // <- import für Bild

export const metadata = {
  title: 'NBW - NBA WebApp',
  description: 'NBA Team - und Spielerübersicht',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <header className="bg-black text-white p-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/nba.png"          // <- dein Logo im public-Ordner
              alt="NBW Logo"
              width={48}
              height={48}
              className="rounded"
            />
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="hover:underline hover:text-gray-300 transition">Home</Link>
            <Link href="/teams" className="hover:underline hover:text-gray-300 transition">Teams</Link>
            <Link href="/players" className="hover:underline hover:text-gray-300 transition">Players</Link>
            <Link href="/feedback" className="hover:underline hover:text-gray-300 transition">Feedback</Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
