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
