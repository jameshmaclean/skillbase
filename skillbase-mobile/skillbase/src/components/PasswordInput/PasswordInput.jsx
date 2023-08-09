import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { InputSenha } from "./stylex";

const PasswordInput = ({ handlePasswordInput, senha, label }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <InputSenha
        secureTextEntry={!showPassword}
        value={senha}
        onChangeText={handlePasswordInput}
        label={label}
      />
      <TouchableOpacity
        onPress={handleTogglePassword}
        style={{
          position: "absolute",
          right: 10,
          padding: 10,
        }}
      >
        <Icon
          name={showPassword ? "eye-slash" : "eye"}
          size={25}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
