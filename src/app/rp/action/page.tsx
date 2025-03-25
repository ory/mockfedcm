'use client';

import RPAction from '../_components/rpAction';
import RPActionExplanation from '../_components/rpActionExplanation';

export default function RPActionPage() {
  return (
    <>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>FedCM Testing</h1>
        <RPActionExplanation />
      </div>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Test Authentication</h1>
        <RPAction />
      </div>
    </>
  );
}
