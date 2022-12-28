import { Credentials } from "../types";

export const CREDENTIALS_LABELS: Record<Credentials, string> = {
  [Credentials.Phone]: "Phone number",
  [Credentials.Identity]: "Legal Identity",
  [Credentials.Orb]: "Orb",
};
