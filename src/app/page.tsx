import React from 'react';
import Link from 'next/link';
import AlertMessage, { AlertType } from '@/components/ui/alertMessage';

export default function Home() {
  return (
    <>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Welcome to Mock FedCM</h1>
        <p className='text-lg text-gray-600'>
          A free FedCM RP & IdP for testing FedCM integrations.
        </p>
        <div className='space-y-4'>
          <Link
            href='/rp'
            className='block w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow'
          >
            <h2 className='text-xl font-semibold'>
              Set up FedCM Relying Party
            </h2>
            <p className='text-gray-600'>
              Configure your application to use FedCM
            </p>
          </Link>
          <Link
            href='/idp'
            className='block w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow'
          >
            <h2 className='text-xl font-semibold'>
              Set up FedCM Identity Provider
            </h2>
            <p className='text-gray-600'>
              Configure your identity provider for FedCM
            </p>
          </Link>
        </div>
      </div>
      <div className='space-y-6'>
        <h2 className='text-2xl font-semibold'>FedCM Details</h2>
        <AlertMessage
          className='alert-warning'
          alertType={AlertType.WARNING}
          message='This site is for testing purposes only. Do not use in production.'
          allowHtml={false}
        />
      </div>
    </>
  );
}
