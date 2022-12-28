import { internalAxios } from "../lib/axios";
import {
  Credentials,
  CredentialStatus,
  ICredential,
  ICredentialSecret,
} from "../types";
import { NativeModules } from "react-native";
import * as Random from "expo-random";
import * as Crypto from "expo-crypto";

const { Semaphore } = NativeModules;

export const createCredential = async (
  credentialType: Credentials
): Promise<{
  credential: ICredential;
  credentialSecret: ICredentialSecret;
}> => {
  // TODO: Use single side and derive all secrets from it?
  const seed = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    Random.getRandomBytes(32).toString()
  );
  let identityCommitment = "";

  if (Semaphore) {
    identityCommitment = Semaphore.generateIdentityCommitment(seed);
  } else {
    console.warn(
      "Sempahore is not available, likely running on Expo Go, simulate identity commitment"
    );
    identityCommitment =
      "0x" +
      (await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        Random.getRandomBytes(32).toString()
      )); // Simulated identity commitment for Expo Go
  }

  return {
    credential: {
      type: credentialType,
      identityCommitment,
      status: CredentialStatus.Created,
    },
    credentialSecret: {
      type: credentialType,
      identitySecret: seed,
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
