import { NextResponse } from 'next/server';
import { BalldontlieAPI } from '@balldontlie/sdk';

const api = new BalldontlieAPI({
  apiKey: '9943c244-d2ba-4f98-a9cf-0277aff9be75',
});

export async function GET() {
  try {
    const result = await api.nba.getTeams();

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Teams: ' + error.message },
      { status: 500 }
    );
  }
}
