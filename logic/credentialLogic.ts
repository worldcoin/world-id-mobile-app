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
