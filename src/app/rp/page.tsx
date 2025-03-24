import React from 'react';
import ExplanationSection from './_components/rpExplanation';
import RPForm from './_components/rpForm';

export default function RPPage() {
  return (
    <>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Relying Party Setup</h1>
        <ExplanationSection />
      </div>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Configure Your RP</h1>
        <RPForm />
      </div>
    </>
  );
}
