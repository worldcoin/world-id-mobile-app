import { internalAxios } from "../lib/axios";
import {
  Credentials,
  CredentialStatus,
  ICredential,
  ICredentialSecret,
} from "../types";

export const createCredential = (
  credentialType: Credentials
): { credential: ICredential; credentialSecret: ICredentialSecret } => {
  return {
    credential: {
      type: credentialType,
      identityCommitment: `0x10b61db94c4c834e7dc00352a43359a0143e699715a3aebc975cb9082495b1b4`, // TODO
      identityTrapdoor: "", // TODO: Bridge to @philzip's library
      identityNullifier: "", // TODO
      status: CredentialStatus.Created,
    },
    credentialSecret: {
      type: credentialType,
      identitySecret: `secret_${Math.random()}`,
    },
  };
};

interface ICredentialState {
  status: CredentialStatus;
  error_details?: string;
  identity_commitment: string;
  credential_data?: Record<string, any>; // TODO: Actually handle this data properly
}

export const fetchCredentialState = async (
  credentialType: Credentials,
  identity_commitment: string
): Promise<null | ICredentialState> => {
  const response = await internalAxios.post(
    "/api/v-alpha/credentials/retrieve",
    {
      credential_type: credentialType,
      identity_commitment,
    }
  );

  const credentials = response.data as ICredentialState[];
  return (
    credentials.find((c) => c.identity_commitment === identity_commitment) ??
    null
  );
};

export const registerCredential = async (
  identity_commitment: string,
  credential_type: Credentials
) => {
  const response = await internalAxios.post<{ url: string }>(
    `/api/v-alpha/credentials/register`,
    {
      identity_commitment,
      credential_type,
    }
  );
  // TODO: This is too identity-specific, generalize later
  return response?.data?.url;
};
