import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!email || !password) {
      setMessage('Email and password are required.');
      setLoading(false);
      return;
    }

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    setMessage(error ? error.message : isSignUp
      ? 'Sign-up successful! Check your email for confirmation.'
      : 'Login successful!');

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-xl bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isSignUp ? 'Create Account' : 'Log In'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      {message && <p className="text-sm mt-3 text-center text-gray-700">{message}</p>}

      <button
        className="mt-4 block text-center text-blue-600 underline w-full"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? 'Already have an account? Log in'
          : "Don't have an account? Sign up"}
      </button>
    </div>
  );
}
