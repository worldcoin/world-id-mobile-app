import { Credentials, CredentialStatus, ICredential } from "../types";

export const createCredential = (credentialType: Credentials): ICredential => {
  return {
    type: credentialType,
    identityCommitment: `ic_${Math.random()}`, // TODO
    identityTrapdoor: "", // TODO: Bridge to @philzip's library
    identityNullifier: "", // TODO
    status: CredentialStatus.Created,
  };
};
