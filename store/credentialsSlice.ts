import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Credentials, ICredential } from "../types";

interface ActionAppendType {
  credential: ICredential;
}

interface ActionUpdateType {
  credential: ICredential;
  index: number;
}

interface IActionDeleteCredential {
  credentialType: Credentials;
}

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    credentialList: [] as ICredential[],
  },
  reducers: {
    append: (state, action: PayloadAction<ActionAppendType>) => {
      state.credentialList.push(action.payload.credential);
    },
    updateAtIndex: (state, action: PayloadAction<ActionUpdateType>) => {
      state.credentialList[action.payload.index] = action.payload.credential;
    },
    deleteCredential: (
      state,
      action: PayloadAction<IActionDeleteCredential>
    ) => {
      state.credentialList = state.credentialList.filter(
        (credential) => credential.type !== action.payload.credentialType
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { append, updateAtIndex, deleteCredential } =
  credentialsSlice.actions;

export default credentialsSlice.reducer;
