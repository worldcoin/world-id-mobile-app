import axios from "axios";
import Toast from "react-native-toast-message";

export const internalAxios = axios.create();
internalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = `${error.message}${
      error.response.status === 400
        ? `: ${JSON.stringify(error.response?.data)}`
        : ""
    }`;
    Toast.show({
      type: "error",
      text1: "Request error",
      text2: message,
    });
  }
);
