import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credentials, ICredentialSecret } from "../types";

interface IAppendSecret {
  credentialSecret: ICredentialSecret;
}

interface IDeleteSecret {
  credentialType: Credentials;
}

export const secureSlice = createSlice({
  name: "secure",
  initialState: {
    credentialSecrets: [] as ICredentialSecret[],
  },
  reducers: {
    appendCredentialSecret: (state, action: PayloadAction<IAppendSecret>) => {
      state.credentialSecrets.push(action.payload.credentialSecret);
    },
    deleteCredentialSecret: (state, action: PayloadAction<IDeleteSecret>) => {
      state.credentialSecrets = state.credentialSecrets.filter(
        (credentialSecret) =>
          credentialSecret.type !== action.payload.credentialType
      );
    },
  },
});

export const { appendCredentialSecret, deleteCredentialSecret } =
  secureSlice.actions;

export default secureSlice.reducer;
