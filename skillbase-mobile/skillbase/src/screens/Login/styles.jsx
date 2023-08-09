import styled from "styled-components/native";
import { corPrimaria, branco, cinza, complementar } from "../../../Global";
import { Button, Text, TextInput } from "@react-native-material/core";

export const ViewContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${corPrimaria};
  align-items: center;
  justify-content: start;
`;
export const Titulo = styled.Text`
  color: ${branco};
`;
export const Logo = styled.Image`
  width: 100%;
  height: 300px;
`;
export const Input = styled(TextInput)`
  width: 75%;
  margin-top: 10px;
`;
export const BotaoLogar = styled(Button)`
  width: 75%;
  background-color: ${complementar};
  margin-top: 10px;
`;
export const BotaoCadastrar = styled(Button)`
  width: 75%;
  background-color: ${cinza};
  margin-top: 10px;
`;
export const LembrarSenha = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 75%;
  justify-content: flex-end;
`;
export const TextoLembrarSenha = styled(Text)`
  color: ${branco};
  margin-left: 5px;
  font-size: 15px;
  font-weight: 800;
`;
