import { cookies } from 'next/headers';
import {
  FedCMAccountsResponse,
  FedCMClientMetadataResponse,
  FedCMManifestResponse,
} from '@/types/fedcm';
import jwt from 'jsonwebtoken';

export const FEDCM_COOKIE_NAME = 'fedcm_session';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const IDP_DOMAIN = process.env.APP_FQDN || 'localhost:3000';

export function getManifestResponse(): FedCMManifestResponse {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${IDP_DOMAIN}`;

  return {
    accounts_endpoint: `/api/fedcm/accounts`,
    client_metadata_endpoint: `/api/fedcm/client-metadata`,
    id_assertion_endpoint: `/api/fedcm/token`,
    disconnect_endpoint: `/api/fedcm/disconnect`,
    login_url: `/idp`,
    branding: {
      name: process.env.FEDCM_PROVIDER_NAME || 'FedCM Mock IdP',
      background_color: process.env.FEDCM_BACKGROUND_COLOR || '#ffffff',
      color: process.env.FEDCM_TEXT_COLOR || '#000000',
      icons: [
        {
          url: `${baseUrl}/icon.png`,
          size: 32,
        },
      ],
    },
  };
}

// Get user from cookie
export async function getUserFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(FEDCM_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    // Verify the JWT to ensure it's valid
    const payload = jwt.verify(sessionCookie.value, JWT_SECRET) as {
      username: string;
    };
    return payload.username;
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}

// Create a signed cookie with username
export function createUserCookie(username: string): string {
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
  return token;
}

// Generate mock accounts for current user
export async function getMockAccounts(): Promise<FedCMAccountsResponse> {
  const username = await getUserFromCookie();

  if (!username) {
    return { accounts: [] };
  }

  // Create two mock accounts based on the username
  return {
    accounts: [
      {
        id: `${username}-personal`,
        name: `${username} (Personal)`,
        email: `${username}@example.com`,
        given_name: username,
        picture: 'https://picsum.photos/id/1005/200',
        approved_clients: [],
      },
      {
        id: `${username}-work`,
        name: `${username} (Work)`,
        email: `${username}@work-example.com`,
        given_name: username,
        picture: 'https://picsum.photos/id/1012/200',
        approved_clients: [],
      },
    ],
  };
}

// Return client metadata (accept any client_id)
export function getClientMetadata(
  clientId: string
): FedCMClientMetadataResponse {
  return {
    privacy_policy_url: `https://${clientId}/privacy`,
    terms_of_service_url: `https://${clientId}/terms`,
  };
}

// Generate a token for the given account_id and client_id
export function generateToken(accountId: string, clientId: string): string {
  // Create a JWT token for the user
  const payload = {
    sub: accountId,
    aud: clientId,
    iss: IDP_DOMAIN,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
  };

  return jwt.sign(payload, JWT_SECRET);
}
