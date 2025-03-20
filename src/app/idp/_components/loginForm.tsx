import Button from '@/components/ui/button';
import TextInput from '@/components/ui/textInput';
import { useState, useEffect } from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [flowId, setFlowId] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get flow ID when component mounts
  useEffect(() => {
    const fetchFlowId = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/auth/login', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to initialize login flow');
        }

        const data = await response.json();
        setFlowId(data.flowId);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlowId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!flowId) {
      setError('Login flow not initialized. Please refresh the page.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/idp/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flowId,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // TODO: figure out where to redirect after login...
      window.location.href = '/';
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !flowId) {
    return (
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body flex items-center justify-center'>
          <div className='loading loading-spinner loading-lg'></div>
          <p className='mt-2'>Initializing login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Sign In</h2>

        {error && (
          <div className='alert alert-error'>
            <span>{error}</span>
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
            onChange={(value) => setFormData({ ...formData, password: value })}
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
  );
}
