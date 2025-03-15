import AlertMessage, { AlertType } from '@/components/ui/alertMessage';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex w-full max-w-4xl flex-col space-y-5 px-2'>
        <h1 className='text-center text-xl font-extrabold text-gray-900 md:text-2xl'>
          A FedCM site for testing FedCM integrations.
        </h1>
        <div className='flex flex-col justify-between space-y-5 md:flex-row md:space-y-0'>
          <div className='flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0'>
            <Link href='/rp' className='btn-primary btn-active btn'>
              Setup & Test FedCM Relying Party
            </Link>
          </div>
          <Link href='' className='btn-outline btn-primary btn'>
            Setup & Test FedCM Identity Provider
          </Link>
        </div>
        <div className='border-2 p-3'>
          This will have details about FedCM, place holder for now.
        </div>
        <AlertMessage
          className=''
          alertType={AlertType.ERROR}
          message='Caution: Not for production use.'
        />
      </div>
    </div>
  );
}
