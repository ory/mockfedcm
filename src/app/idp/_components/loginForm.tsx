import Button from '@/components/ui/button';
import TextInput from '@/components/ui/textInput';
import { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setSuccess(true);

      // TODO: figure out where to redirect after login...
      window.location.href = '/';
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full flex justify-center'>
      <div className='card w-full max-w-md bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>Sign In</h2>

          {error && (
            <div className='alert alert-error'>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className='alert alert-success'>
              <span>Successfully signed in! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <TextInput
              type='email'
              label='Email'
              value={formData.email}
              placeholder='Email'
              className='input input-bordered'
              onChange={(value) => setFormData({ ...formData, email: value })}
              required
            />
            <TextInput
              type='password'
              label='Password'
              value={formData.password}
              placeholder='Password'
              className='input input-bordered'
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
              required
            />
            <div className='pt-4'>
              <Button type='submit' disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
