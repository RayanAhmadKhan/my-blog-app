'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Signup failed');
      return;
    }
    router.push('/posts');
    router.refresh();
  }

  return (
    <div className="auth-grid">
      <section className="surface auth-panel">
        <p className="eyebrow">Create access</p>
        <h1>Sign up</h1>
        <p className="auth-note">Create a quick demo account so you can test post creation and deletion.</p>
        <ul className="feature-list">
          <li>One-minute signup flow</li>
          <li>Used for post ownership testing</li>
          <li>Works with the demo JSON database</li>
        </ul>
      </section>
      <section className="surface auth-card">
        <form onSubmit={handleSubmit} className="stack">
          {error && <p className="error-banner">{error}</p>}
          <div className="form-group">
            <label className="field-label" htmlFor="name">Name</label>
            <input id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="field-label" htmlFor="signup-email">Email</label>
            <input id="signup-email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="field-label" htmlFor="signup-password">Password</label>
            <input id="signup-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="submit" className="button button-primary">Sign Up</button>
          </div>
        </form>
        <p className="auth-note" style={{ marginTop: 16 }}>Already have an account? <Link href="/login" className="link-button" style={{ display: 'inline-flex' }}>Log in</Link></p>
      </section>
    </div>
  );
}
