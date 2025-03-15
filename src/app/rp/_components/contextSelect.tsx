'use client';

import React from 'react';
import SelectInput from '@/components/ui/select';

export enum FedCMContext {
  Continue = 'continue',
  SignIn = 'signin',
  SignUp = 'signup',
  Use = 'use',
}

export type ContextOption = {
  value: FedCMContext;
  label: string;
  description: string;
};

interface ContextSelectProps {
  value: FedCMContext;
  onChange: (value: FedCMContext) => void;
  error?: string;
}

const ContextSelect = ({ value, onChange, error }: ContextSelectProps) => {
  const contextOptions: ContextOption[] = [
    {
      value: FedCMContext.Continue,
      label: 'Continue',
      description: 'Continue with an existing session',
    },
    {
      value: FedCMContext.SignIn,
      label: 'Sign In',
      description: 'Sign in to an existing account',
    },
    {
      value: FedCMContext.SignUp,
      label: 'Sign Up',
      description: 'Create a new account',
    },
    {
      value: FedCMContext.Use,
      label: 'Use',
      description: 'Use an identity without creating a session',
    },
  ];

  return (
    <SelectInput<FedCMContext>
      label='Context'
      options={contextOptions}
      value={value}
      onChange={onChange}
      error={error}
      required
    />
  );
};

export default ContextSelect;
