import { NextResponse } from 'next/server';
import { isHttpsEnabled } from '../../../utils/https';

export async function GET() {
  // Get the base URL from environment variables using our HTTPS utility
  const protocol = isHttpsEnabled() ? 'https' : 'http';
  const baseUrl = process.env.NEXT_PUBLIC_APP_FQDN
    ? `${protocol}://${process.env.NEXT_PUBLIC_APP_FQDN}`
    : '';

  const webIdentity = {
    provider_urls: [`${baseUrl}/api/fedcm/config.json`],
  };

  return NextResponse.json(webIdentity);
}
