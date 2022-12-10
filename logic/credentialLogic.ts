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
      identityCommitment: `ic_${Math.random()}`, // TODO
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
