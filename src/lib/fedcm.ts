import { cookies } from 'next/headers';
import {
  FedCMAccount,
  FedCMAccountsResponse,
  FedCMClientMetadataResponse,
  FedCMManifestResponse,
} from '@/types/fedcm';
import { validateSession, getIdentity } from '@/lib/ory';
import { Identity } from '@ory/client-fetch';
import * as jwt from 'jsonwebtoken';

export const FEDCM_COOKIE_NAME = 'fedcm_session';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const IDP_DOMAIN = process.env.APP_FQDN || 'localhost:3000';

export function getManifestResponse(): FedCMManifestResponse {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${IDP_DOMAIN}`;

  return {
    accounts_endpoint: `/idp/api/fedcm/accounts`,
    client_metadata_endpoint: `/idp/api/fedcm/client-metadata`,
    id_assertion_endpoint: `/idp/api/fedcm/token`,
    disconnect_endpoint: `/idp/api/fedcm/disconnect`,
    login_url: `/idp/login`,
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

export async function getUserFromSession(): Promise<Identity | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(FEDCM_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const session = await validateSession(sessionToken);
    return await getIdentity(session.identity?.id || '');
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

export function oryIdentityToFedCMAccount(identity: Identity): FedCMAccount {
  // Extract relevant information from Ory Identity traits
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traits = identity.traits as any;
  const metadata = identity.metadata_public as {
    approved_clients?: string[];
  } | null;

  return {
    id: identity.id,
    name: traits.name?.full || traits.email,
    email: traits.email,
    given_name: traits.name?.first,
    picture: traits.picture,
    approved_clients: metadata?.approved_clients || [],
  };
}

export async function getAccounts(): Promise<FedCMAccountsResponse> {
  const user = await getUserFromSession();

  if (!user) {
    return { accounts: [] };
  }

  return {
    accounts: [oryIdentityToFedCMAccount(user)],
  };
}

export function getClientMetadata(
  clientId: string
): FedCMClientMetadataResponse {
  // In a real implementation, you would look up the client information from a database
  return {
    privacy_policy_url: `https://${clientId}/privacy`,
    terms_of_service_url: `https://${clientId}/terms`,
  };
}

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
