import React, { useRef, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  BotaoLogar,
  Input,
  LembrarSenha,
  Logo,
  ViewContainer,
  TextoLembrarSenha,
  BotaoCadastrar,
} from "./styles";
import Checkbox from "expo-checkbox";
import UserContext from "../../contexts/UserContext";
import { complementar } from "../../../Global";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { logar } from "../../services/auth/AuthService";

const Login = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const loginRef = useRef();
  const senhaRef = useRef();
  const [usuario, setUsuario] = useState({ username: "", password: "" });
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [gravarSenha, setGravarSenha] = useState(true);

  const handleLoginInput = (text) => {
    setUsuario({ ...usuario, username: text });
    setUserNameError(false);
  };

  const handleGravarCheck = async () => {
    setGravarSenha(!gravarSenha);
    if (!gravarSenha) {
      try {
        await AsyncStorage.setItem("dados", JSON.stringify(usuario));
      } catch (error) {
        console.log("Erro enquanto salvava os dados:", error);
      }
    } else {
      try {
        await AsyncStorage.removeItem("dados");
      } catch (error) {
        console.log("Erro enquanto removia os dados:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("dados");
        if (userData) {
          setGravarSenha(true);
          setUsuario(JSON.parse(userData) || { username: "", password: "" });
        } else {
          setGravarSenha(false);
          setUsuario({ username: "", password: "" });
        }
      } catch (error) {
        console.log("Erro enquanto recuperava dados do usuario", error);
        setGravarSenha(false);
        setUsuario({ username: "", password: "" });
      }
    };

    fetchUserData();
  }, [gravarSenha]);

  const handlePasswordInput = (text) => {
    setUsuario({ ...usuario, password: text });
    setPasswordError(false);
  };

  const handleSubmit = async () => {
    if (usuario.username === "") {
      setUserNameError(true);
      return;
    }
    if (usuario.password === "") {
      setPasswordError(true);
      return;
    } else {
      const data = await logar(usuario);
      if (data) {
        setUser(data);
        navigation.navigate("Home");
      } else {
        Alert.alert("Usuário e/ou senha incorretos");
      }
    }
  };

  const handleTapOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <ViewContainer>
        <Logo
          source={require("../../../assets/logo.png")}
          resizeMode="contain"
        />
        <Input
          label="Usuário"
          textContentType="username"
          ref={loginRef}
          value={usuario.username}
          onChangeText={handleLoginInput}
          onSubmitEditing={() => senhaRef.current.focus()}
        />
        <PasswordInput
          label="Senha"
          handlePasswordInput={handlePasswordInput}
          senha={usuario.password}
        />
        <LembrarSenha>
          <Checkbox
            color={gravarSenha ? complementar : "white"}
            label="Lembrar senha"
            value={gravarSenha}
            onValueChange={handleGravarCheck}
          />
          <TextoLembrarSenha>Gravar senha?</TextoLembrarSenha>
        </LembrarSenha>
        <BotaoLogar title="Entrar" disableElevation onPress={handleSubmit} />
        <BotaoCadastrar
          title="Cadastrar"
          titleStyle={{ color: complementar }}
          disableElevation
          onPress={() => navigation.navigate("Cadastrar")}
        />
      </ViewContainer>
    </TouchableWithoutFeedback>
  );
};

export default Login;
