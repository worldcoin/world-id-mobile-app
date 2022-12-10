import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCredentialState } from "../logic/credentialLogic";
import { Credentials, CredentialStatus, ICredential } from "../types";

interface ActionAppendType {
  credential: ICredential;
}
interface IActionDeleteCredential {
  credentialType: Credentials;
}

export const updateCredentialRemoteState = createAsyncThunk(
  "credentials/updateCredentialRemoteState",
  async ({
    identityCommitment,
    type,
  }: Pick<ICredential, "identityCommitment" | "type">) => {
    return await fetchCredentialState(type, identityCommitment);
  }
);

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    list: [] as ICredential[],
  },
  reducers: {
    append: (state, action: PayloadAction<ActionAppendType>) => {
      state.list.push(action.payload.credential);
    },
    // FIXME: Credential deletion should also call the API to revoke the credential
    deleteCredential: (
      state,
      action: PayloadAction<IActionDeleteCredential>
    ) => {
      state.list = state.list.filter(
        (credential) => credential.type !== action.payload.credentialType
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCredentialRemoteState.fulfilled, (state, action) => {
      const status =
        action.payload === null
          ? CredentialStatus.Revoked
          : action.payload.status;
      const credential = state.list.find(
        (credential) =>
          credential.identityCommitment === action.payload?.identity_commitment
      );
      if (credential) {
        credential.status = status;
        credential.error_details = action.payload?.error_details;
        state.list = [
          ...state.list.filter(
            (credential) =>
              credential.identityCommitment !==
              action.payload?.identity_commitment
          ),
          credential,
        ];
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { append, deleteCredential } = credentialsSlice.actions;

export default credentialsSlice.reducer;
