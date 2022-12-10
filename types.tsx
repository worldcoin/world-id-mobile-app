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
}

export interface ZKPRequest {
  merkle_root: string;
  action_id: string;
  // identity
}

export interface ICredential {
  type: Credentials;
  status: CredentialStatus;
  identityCommitment: string; // Semaphore identity
  identityNullifier: string; // Semaphore identity
  identityTrapdoor: string; // Semaphore identity
  identitySecret?: string; // Semaphore identity
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
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  WorldID: undefined;
  Settings: undefined;
  Credential: { credentialType: Credentials };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
