//require("node-libs-react-native/globals.js");
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { persistor, store } from "./store";

// Set up tailwind-rn
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // @ts-ignore: https://github.com/vadimdemedes/tailwind-rn/issues/169
      <TailwindProvider utilities={utilities}>
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
              <Toast position="bottom" />
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </TailwindProvider>
    );
  }
}
