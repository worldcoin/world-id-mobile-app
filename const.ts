import { Credentials } from "./types";

export const API_URL = "https://0e09-212-18-2-82.eu.ngrok.io";

export const CREDENTIALS_LABELS: Record<Credentials, string> = {
  [Credentials.Phone]: "Phone number",
  [Credentials.Identity]: "Legal Identity",
  [Credentials.Orb]: "Orb",
};
