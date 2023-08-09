import React, { useState } from "react";
import {
  BotaoCadastrar,
  ContainerInput,
  ContainerLogo,
  Input,
  Logo,
  Titulo,
  ViewContainer,
} from "./styles";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { Alert, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import { cadastrar } from "../../services/auth/AuthService";

const Cadastro = ({ navigation }) => {
  const [repetirSenha, setRepetirSenha] = useState("");
  const [novoUsuario, setNovoUsuario] = useState({
    username: "",
    email: "",
    role: ["USER"],
    password: "",
  });
  const handleUserName = (text) => {
    setNovoUsuario({ ...novoUsuario, username: text });
  };
  const handleEmail = (text) => {
    setNovoUsuario({ ...novoUsuario, email: text });
  };
  const handleSenha = (text) => {
    setNovoUsuario({ ...novoUsuario, password: text });
  };
  const handleRepetirSenha = (text) => {
    setRepetirSenha(text);
  };
  const handleTapOutside = () => {
    Keyboard.dismiss();
  };
  const handleSubmit = async () => {
    if (
      novoUsuario.email == "" ||
      novoUsuario.password == "" ||
      novoUsuario.username == "" ||
      novoUsuario.password == "" ||
      repetirSenha == ""
    ) {
      Alert.alert("Por favor verifique todos os campos");
    } else if (novoUsuario.password != repetirSenha) {
      Alert.alert("As senhas devem ser iguais");
    } else {
      const data = await cadastrar(novoUsuario);
      if (data.status == 200) {
        Alert.alert("Cadastrado com sucesso");
        navigation.navigate("Login");
      } else {
        Alert.alert("Não foi possivel cadastrar");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <ViewContainer>
        <ContainerLogo>
          <Logo
            source={require("../../../assets/logo-colorido.png")}
            resizeMode="cover"
          />
          <Titulo>Crie já a sua conta :)</Titulo>
        </ContainerLogo>
        <ContainerInput>
          <Input
            label="Usuário"
            value={novoUsuario.username}
            onChangeText={handleUserName}
          />
          <Input
            label="E-mail"
            value={novoUsuario.email}
            onChangeText={handleEmail}
          />
          <PasswordInput
            label="Senha"
            senha={novoUsuario.password}
            handlePasswordInput={handleSenha}
          />
          <PasswordInput
            label="Digite novamente a senha"
            senha={repetirSenha}
            handlePasswordInput={handleRepetirSenha}
          />
          <BotaoCadastrar title="Cadastrar" onPress={handleSubmit} />
        </ContainerInput>
      </ViewContainer>
    </TouchableWithoutFeedback>
  );
};

export default Cadastro;
