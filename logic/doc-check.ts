import axios from "axios";
import { API_URL } from "../const";

export const getDockCheckUrl = async (identity_commitment: string) => {
  const response = axios.post<{ url: string }>(
    `${API_URL}/api/v-alpha/kyc-start`,
    {
      identity_commitment,
    }
  );
  return (await response).data.url;
};
