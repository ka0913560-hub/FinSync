import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem('finsync_user', JSON.stringify({ email }));
    nav('/dashboard');
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="card">
        <h2 className="text-2xl font-semibold mb-2">Welcome to FinSync</h2>
        <p className="text-sm text-gray-500 mb-4">All Your Finances, One Dashboard</p>
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input className="border rounded px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
          <button className="bg-primary text-white px-4 py-2 rounded">Sign in / Sign up</button>
        </form>
      </div>
    </div>
  );
}
