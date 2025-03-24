'use client';

import React from 'react';
import IdPExplanation from './_components/idpExplanation';
import IdPForm from './_components/loginForm';

export default function IdPPage() {
  return (
    <>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Identity Provider Setup</h1>
        <IdPExplanation />
      </div>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Login to the Mock IdP</h1>
        <IdPForm />
      </div>
    </>
  );
}
