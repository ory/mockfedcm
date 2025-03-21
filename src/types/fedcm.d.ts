declare global {
  interface Navigator {
    credentials: {
      get(options: CredentialRequestOptions): Promise<FedCMCredential>;
      // Include other credential methods as needed
    };
  }
}

// Following the FedCM API spec at https://developer.mozilla.org/en-US/docs/Web/API/FedCM_API/RP_sign-in
interface CredentialRequestOptions {
  identity?: {
    providers: Array<{
      configURL: string;
      clientId: string;
      nonce?: string;
      loginHint?: string;
    }>;
    context?: string;
  };
  mediation?: 'optional' | 'required' | 'silent';
  signal?: AbortSignal;
}

interface FedCMCredential {
  type: string;
  token: string;
  [key: string]: unknown; // For additional properties returned by the IdP
}

export interface FedCMConfigResponse {
  provider_urls: string[];
}

export interface FedCMManifestResponse {
  accounts_endpoint: string;
  client_metadata_endpoint: string;
  id_assertion_endpoint: string;
  disconnect_endpoint?: string;
  login_url: string;
  branding: {
    background_color: string;
    color: string;
    icons: Array<{
      url: string;
      size: number;
    }>;
    name: string;
  };
}

export interface FedCMAccountsResponse {
  accounts: FedCMAccount[];
}

export interface FedCMClientMetadataRequest {
  client_id: string;
  nonce: string;
}

export interface FedCMClientMetadataResponse {
  privacy_policy_url: string;
  terms_of_service_url: string;
}

export interface FedCMTokenRequest {
  account_id: string;
  client_id: string;
  nonce: string;
  disclosure_text_shown: boolean;
}

export interface FedCMTokenResponse {
  token: string;
}

// This empty export is necessary to make this a module
export {};
