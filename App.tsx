//require("node-libs-react-native/globals.js");
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import Toast from "react-native-toast-message";

// https://docs.walletconnect.com/2.0/javascript/guides/react-native#set-up
import "@walletconnect/react-native-compat";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
            <Toast position="bottom" />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
