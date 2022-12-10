import { API_URL } from "../const";
import { internalAxios } from "../lib/axios";
import { Credentials } from "../types";

export const startLegalIdentity = async (
  identity_commitment: string,
  credential_type: Credentials
) => {
  const response = await internalAxios.post<{ url: string }>(
    `${API_URL}/api/v-alpha/credentials/register`,
    {
      identity_commitment,
      credential_type,
    }
  );
  return response?.data?.url;
};
