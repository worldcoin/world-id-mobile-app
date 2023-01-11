import { TextInput, TextInputProps, View } from "react-native";
import { useTailwind } from "tailwind-rn";

// https://ihateregex.io/expr/phone/
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

type InputBoxProps = TextInputProps & {
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

export function InputBox(props: InputBoxProps) {
  const tailwind = useTailwind();

  const validateInput = (input: string) => {
    console.debug("input:", input);
    props.setPhoneNumber(input);
    if (input && input.match(PHONE_REGEX)) {
      console.debug("valid");
      props.setIsValid(true);
    } else {
      console.debug("invalid");
      props.setIsValid(false);
    }
  };

  return (
    <View
      style={[
        tailwind("flex justify-center border-2 rounded-xl p-3 h-12"),
        props.isValid ? tailwind("bg-[#F1F5F8] border-0") : null,
      ]}
    >
      {/* TODO: Select country dropdown */}
      <TextInput {...props} onChangeText={(input) => validateInput(input)} />
    </View>
  );
}
