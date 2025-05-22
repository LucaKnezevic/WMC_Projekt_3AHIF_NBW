import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'NBW - NBA WebApp',
  description: 'NBA Team- und Spielerübersicht',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <header className="bg-black text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">NBW</h1>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/teams">Teams</Link>
            <Link href="/players">Players</Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
