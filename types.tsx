import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ANCHOR: Custom types

export enum Credentials {
  Phone = "phone",
  Identity = "identity",
  Orb = "orb",
}

export enum CredentialStatus {
  Created = "created",
  Verified = "verified",
  Errored = "errored",
  Revoked = "revoked", // Removed from remote server
}

export interface ICredential {
  type: Credentials;
  status: CredentialStatus;
  error_details?: string; // Remote error details registering a credential (e.g. phone number already registered)
  identityCommitment: string;
}
export interface ICredentialSecret {
  type: Credentials;
  identitySecret: string;
}

// ANCHOR: Navigation types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Credential: RootTabParamList["Credential"];
  Apps: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  WorldID: undefined;
  Apps: undefined;
  Credential: { credentialType: Credentials };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
