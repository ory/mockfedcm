import { NextRequest, NextResponse } from 'next/server';
import {
  getManifestResponse,
  getMockAccounts,
  getClientMetadata,
  generateToken,
  getUserFromCookie,
} from '@/lib/fedcm';
import { FedCMTokenRequest } from '@/types/fedcm';

// Common FedCM headers
const FEDCM_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Sec-Fetch-Dest',
  'Content-Type': 'application/json',
};

// Define valid FedCM routes
type FedCMRoute =
  | 'manifest'
  | 'accounts'
  | 'client-metadata'
  | 'disconnect'
  | 'token'
  | 'config.json';

// Validate if the request is coming from the FedCM API
function validateFedCMRequest(
  request: NextRequest,
  expectedDest: string
): boolean {
  const secFetchDest = request.headers.get('Sec-Fetch-Dest');

  // In development, we might want to bypass this check
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.BYPASS_SEC_FETCH_CHECK === 'true'
  ) {
    return true;
  }

  return secFetchDest === expectedDest;
}

// Validate if the route is a valid FedCM route
function isValidFedCMRoute(route: string): route is FedCMRoute {
  const validRoutes: FedCMRoute[] = [
    'manifest',
    'accounts',
    'client-metadata',
    'disconnect',
    'token',
    'config.json',
  ];
  return validRoutes.includes(route as FedCMRoute);
}

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ route: string }> }
) {
  const params = await props.params;
  const route = params.route;

  // Enable CORS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: FEDCM_HEADERS, status: 204 });
  }

  if (!isValidFedCMRoute(route)) {
    return NextResponse.json(
      { error: 'Invalid route' },
      { status: 400, headers: FEDCM_HEADERS }
    );
  }

  // Handle different FedCM API endpoints
  switch (route) {
    case 'config.json':
    case 'manifest':
      // Manifest is public and doesn't need Sec-Fetch-Dest validation
      return NextResponse.json(getManifestResponse(), {
        headers: FEDCM_HEADERS,
      });

    case 'accounts':
      // Accounts endpoint must be called from FedCM API
      if (!validateFedCMRequest(request, 'webidentity')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          {
            status: 401,
            headers: FEDCM_HEADERS,
          }
        );
      }

      const accounts = await getMockAccounts();
      return NextResponse.json(accounts, {
        headers: FEDCM_HEADERS,
      });

    case 'client-metadata':
      // Client metadata endpoint must be called from FedCM API
      if (!validateFedCMRequest(request, 'webidentity')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          {
            status: 401,
            headers: FEDCM_HEADERS,
          }
        );
      }

      // Extract client_id from URL query params
      const url = new URL(request.url);
      const clientId = url.searchParams.get('client_id') || 'mockfedcm';

      if (!clientId) {
        return NextResponse.json(
          { error: 'Missing client_id parameter' },
          {
            status: 400,
            headers: FEDCM_HEADERS,
          }
        );
      }

      const clientMetadata = getClientMetadata(clientId);
      return NextResponse.json(clientMetadata, {
        headers: FEDCM_HEADERS,
      });

    case 'disconnect':
      // Disconnect endpoint must be called from FedCM API
      if (!validateFedCMRequest(request, 'webidentity')) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          {
            status: 401,
            headers: FEDCM_HEADERS,
          }
        );
      }

      // Handle disconnect request from browser
      // This endpoint would typically clear approved client lists
      return NextResponse.json(
        { success: true },
        {
          headers: FEDCM_HEADERS,
        }
      );

    default:
      return NextResponse.json(
        { error: 'Route not supported' },
        { status: 405, headers: FEDCM_HEADERS }
      );
  }
}

export async function POST(
  request: NextRequest,
  props: { params: Promise<{ route: string }> }
) {
  const params = await props.params;
  const route = params.route;

  // Enable CORS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: FEDCM_HEADERS, status: 204 });
  }

  if (!isValidFedCMRoute(route)) {
    return NextResponse.json(
      { error: 'Invalid route' },
      { status: 400, headers: FEDCM_HEADERS }
    );
  }

  // Handle token endpoint (the only POST endpoint)
  if (route === 'token') {
    // Token endpoint must be called from FedCM API
    if (!validateFedCMRequest(request, 'webidentity')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        {
          status: 401,
          headers: FEDCM_HEADERS,
        }
      );
    }

    try {
      const username = await getUserFromCookie();
      if (!username) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401, headers: FEDCM_HEADERS }
        );
      }
      const data: FedCMTokenRequest = await request.json();
      // For mock IdP, we accept any client_id and origin
      // Just verify that the account_id is one of our mock accounts
      const accounts = await getMockAccounts();
      const isValidAccount = accounts.accounts.some(
        (account) => account.id === data.account_id
      );

      if (!isValidAccount) {
        return NextResponse.json(
          { error: 'Invalid account_id' },
          {
            status: 400,
            headers: FEDCM_HEADERS,
          }
        );
      }

      // Generate token
      const token = generateToken(data.account_id, data.client_id);

      return NextResponse.json(
        { token },
        {
          headers: FEDCM_HEADERS,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request: ' + error },
        {
          status: 400,
          headers: FEDCM_HEADERS,
        }
      );
    }
  }

  return NextResponse.json(
    { error: 'Route not supported' },
    { status: 405, headers: FEDCM_HEADERS }
  );
}
