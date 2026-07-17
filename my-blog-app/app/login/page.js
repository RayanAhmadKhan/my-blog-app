'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	async function handleSubmit(e) {
		e.preventDefault();
		setError('');
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		const data = await res.json();
		if (!res.ok) {
			setError(data.error || 'Login failed');
			return;
		}
		router.push('/posts');
		router.refresh();
	}

	return (
		<div className="auth-grid">
			<section className="surface auth-panel">
				<p className="eyebrow">Welcome back</p>
				<h1>Log in</h1>
				<p className="auth-note">Use the demo account to test post browsing, editing, and comments.</p>
				<ul className="feature-list">
					<li>Readable test content</li>
					<li>Fast JSON-backed auth</li>
					<li>Simple navigation to verify quickly</li>
				</ul>
			</section>
			<section className="surface auth-card">
				<form onSubmit={handleSubmit} className="stack">
					{error && <p className="error-banner">{error}</p>}
					<div className="form-group">
						<label className="field-label" htmlFor="email">Email</label>
						<input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
					</div>
					<div className="form-group">
						<label className="field-label" htmlFor="password">Password</label>
						<input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
					</div>
					<div className="form-actions">
						<button type="submit" className="button button-primary">Log In</button>
					</div>
				</form>
				<p className="auth-note" style={{ marginTop: 16 }}>No account? <Link href="/signup" className="link-button" style={{ display: 'inline-flex' }}>Sign up</Link></p>
			</section>
		</div>
	);
}
