import { NextResponse } from 'next/server';

export async function GET() {
  // Get the base URL from environment variables
  const baseUrl = process.env.NEXT_PUBLIC_APP_FQDN
    ? `${process.env.NODE_ENV === 'production' ? 'https' : 'http'}://${
        process.env.NEXT_PUBLIC_APP_FQDN
      }`
    : '';

  const webIdentity = {
    provider_urls: [`${baseUrl}/api/fedcm/config.json`],
  };

  return NextResponse.json(webIdentity);
}
