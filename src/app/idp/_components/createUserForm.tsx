'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/ui/textInput';
import Button from '@/components/ui/button';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  pictureUrl?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  pictureUrl?: string;
  general?: string;
}

const CreateUserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    pictureUrl: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
      isValid = false;
    }

    if (formData.pictureUrl && !/^https?:\/\/.+/.test(formData.pictureUrl)) {
      newErrors.pictureUrl = 'Picture URL must be a valid URL';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Create the identity traits object
      const traits = {
        email: formData.email,
        name: {
          first: formData.firstName,
          last: formData.lastName,
        },
        ...(formData.pictureUrl && { picture: formData.pictureUrl }),
      };

      // Call registration API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          traits,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Redirect to login page or dashboard on success
      router.push('/login?registered=true');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='card w-full bg-base-100'>
      <div className='card-body'>
        <h2 className='card-title mb-6'>Create New User</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {errors.general && (
            <div className='alert alert-error'>
              <span>{errors.general}</span>
            </div>
          )}
          <TextInput
            label='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={(value) => setFormData({ ...formData, firstName: value })}
            error={errors.firstName}
            placeholder='John'
            required
          />
          <TextInput
            label='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={(value) => setFormData({ ...formData, lastName: value })}
            error={errors.lastName}
            placeholder='Doe'
            required
          />
          <TextInput
            label='Email'
            name='email'
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
            required
            type='email'
            placeholder='john.doe@example.com'
          />
          <TextInput
            label='Password'
            name='password'
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            error={errors.password}
            type='password'
            placeholder='********'
            required
          />
          <TextInput
            label='Confirm Password'
            name='passwordConfirm'
            value={formData.passwordConfirm}
            onChange={(value) =>
              setFormData({ ...formData, passwordConfirm: value })
            }
            error={errors.passwordConfirm}
            type='password'
            placeholder='********'
            required
          />
          <TextInput
            label='Picture URL'
            name='pictureUrl'
            value={formData.pictureUrl}
            onChange={(value) =>
              setFormData({ ...formData, pictureUrl: value })
            }
            placeholder='https://example.com/picture.jpg'
            error={errors.pictureUrl}
          />
          <div className='card-actions justify-end pt-4'>
            <Button type='submit' disabled={isLoading} variant='primary'>
              {isLoading ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
