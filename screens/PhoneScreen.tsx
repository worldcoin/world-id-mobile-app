import { FontAwesome5 } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Keyboard, Platform, Pressable, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useTailwind } from "tailwind-rn";
import { InputBox } from "../components/InputBox";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function PhoneScreen({
  navigation,
}: RootTabScreenProps<"Phone">) {
  const tailwind = useTailwind();
  const [isValid, setIsValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const handlePhoneSubmit = () => {
    // TODO: Add requests to Twilio here
    navigation.push("OTP", {
      phoneNumber: phoneNumber,
    });
  };

  return (
    <View style={tailwind("flex px-4 py-8 items-center")}>
      <Pressable onPress={Keyboard.dismiss}>
        <View style={tailwind("flex flex-row justify-between content-center")}>
          <Pressable
            onPress={handleGoBack}
            style={tailwind(
              "bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center"
            )}
          >
            <FontAwesome5 size={20} name="arrow-left" color="#858494" />
          </Pressable>
          <Text style={tailwind("text-xl font-bold")}>Phone Number</Text>
          <Text style={tailwind("w-8")}></Text>
        </View>
        <Text style={tailwind("text-3xl font-bold px-4 pt-4 text-center")}>
          Let’s connect your phone number
        </Text>
        <Text style={tailwind("p-4 text-base text-[#858494] text-center")}>
          Enter your phone number and we’re gonna take care of the rest!
        </Text>
        <View style={tailwind("flex flex-1 justify-start")}>
          <InputBox
            value={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            dataDetectorTypes={"phoneNumber"}
            keyboardType={"number-pad"}
            textContentType={"telephoneNumber"}
            placeholder="Your number"
            isValid={isValid}
            setIsValid={setIsValid}
          />
          {/* TODO: Add validation features to Button component */}
          <Pressable
            style={[
              tailwind(
                "bg-[#F1F5F8] w-full rounded-xl mt-7 flex justify-center h-16"
              ),
              isValid ? tailwind("bg-[#4940E0]") : null,
            ]}
            onPress={handlePhoneSubmit}
            disabled={isValid ? false : true}
          >
            <Text
              style={[
                tailwind("text-base text-center font-bold text-[#D1D3D4]"),
                isValid ? tailwind("text-white") : null,
              ]}
            >
              NEXT
            </Text>
          </Pressable>
        </View>
      </Pressable>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      {/* https://github.com/calintamas/react-native-toast-message/blob/main/docs/modal-usage.md */}
      <Toast position="bottom" />
    </View>
  );
}
