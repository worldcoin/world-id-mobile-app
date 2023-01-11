import { FontAwesome5 } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Platform, Pressable, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { useTailwind } from "tailwind-rn";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function OTPScreen({
  route: {
    params: { phoneNumber },
  },
  navigation,
}: RootTabScreenProps<"OTP">) {
  const maxLength = 6;
  const digits = new Array(maxLength).fill(0);
  const tailwind = useTailwind();
  const [otp, setOtp] = useState("");
  const [isReady, setIsReady] = useState(false);
  const inputRef = useRef<TextInput>();

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  const handleInputPress = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOtpSubmit = () => {
    // TODO: Add calls to create phone credential
    console.log("Submit OTP");
    navigation.popToTop();
  };

  const drawDigit = (_: any, index: number) => {
    const digit = otp[index] || "";
    const isCurrent = index === otp.length;
    return (
      <View
        key={index}
        style={[
          tailwind("bg-[#F1F5F8] p-2.5 rounded-lg h-14 w-10"),
          isCurrent ? tailwind("bg-white border-2 border-black") : null,
        ]}
      >
        <Text style={tailwind("text-2xl text-center")}>{digit}</Text>
      </View>
    );
  };

  useEffect(() => {
    setIsReady(otp.length === maxLength);
    return () => {
      setIsReady(false);
    };
  }, [otp]);

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={tailwind("flex p-8 items-center h-full bg-white")}
    >
      <View>
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
        <View>
          <Text style={tailwind("text-3xl font-bold px-4 pt-4 text-center")}>
            Enter SMS Code
          </Text>
          <Text style={tailwind("p-4 text-base text-[#858494] text-center")}>
            We have sent SMS to {JSON.stringify(phoneNumber)}
          </Text>
          <Pressable
            onPress={handleInputPress}
            style={tailwind("flex flex-row justify-between w-full")}
          >
            {digits.map(drawDigit)}
          </Pressable>
          <TextInput
            value={otp}
            maxLength={maxLength}
            onChangeText={setOtp}
            keyboardType={"number-pad"}
            textContentType={"oneTimeCode"}
            style={tailwind("hidden")}
            ref={inputRef}
          />
          <Pressable
            style={[
              tailwind(
                "bg-[#F1F5F8] w-full rounded-xl mt-7 flex justify-center h-16"
              ),
              isReady ? tailwind("bg-[#4940E0]") : null,
            ]}
            onPress={handleOtpSubmit}
            disabled={isReady ? false : true}
          >
            <Text
              style={[
                tailwind("text-base text-center font-bold text-[#D1D3D4]"),
                isReady ? tailwind("text-white") : null,
              ]}
            >
              NEXT
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      {/* https://github.com/calintamas/react-native-toast-message/blob/main/docs/modal-usage.md */}
      <Toast position="bottom" />
    </Pressable>
  );
}
