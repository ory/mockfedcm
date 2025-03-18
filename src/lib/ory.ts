import {
  Configuration,
  FrontendApi,
  Identity,
  Session,
  UpdateLoginFlowBody,
} from '@ory/client-fetch';

// Initialize Ory client
const getOryClient = () => {
  const basePath =
    process.env.ORY_BASE_PATH || 'https://playground.projects.oryapis.com';

  const configuration = new Configuration({
    basePath,
  });

  return new FrontendApi(configuration);
};

export const oryClient = getOryClient();

export async function createLoginFlow(returnTo?: string): Promise<string> {
  try {
    const response = await oryClient.createBrowserLoginFlow({
      returnTo,
    });

    return response.id;
  } catch (error) {
    console.error('Error creating login flow:', error);
    throw new Error('Failed to create login flow');
  }
}

export async function updateLoginFlow(
  flowId: string,
  identifier: string,
  password: string
): Promise<{ sessionToken: string; identityId: string }> {
  try {
    const updateBody: UpdateLoginFlowBody = {
      method: 'password',
      identifier,
      password,
    };

    const response = await oryClient.updateLoginFlow({
      flow: flowId,
      updateLoginFlowBody: updateBody,
    });

    if (!response.session) {
      throw new Error('No session returned from login flow');
    }

    return {
      sessionToken: response.session_token || '',
      identityId: response.session?.identity?.id || '',
    };
  } catch (error) {
    console.error('Login flow update error:', error);
    throw new Error('Authentication failed');
  }
}

export async function validateSession(sessionToken: string): Promise<Session> {
  try {
    const response = await oryClient.toSession({
      xSessionToken: sessionToken,
    });

    return response;
  } catch (error) {
    console.error('Session validation error:', error);
    throw new Error('Invalid session');
  }
}

export async function getIdentity(identityId: string): Promise<Identity> {
  try {
    // Get current session
    const sessionResponse = await oryClient.toSession();

    // We can only access our own identity through the session for security reasons
    if (sessionResponse.identity?.id === identityId) {
      return sessionResponse.identity;
    }

    throw new Error('Unauthorized to access this identity');
  } catch (error) {
    console.error('Identity retrieval error:', error);
    throw new Error('Failed to retrieve identity');
  }
}
