import { styled } from "styled-components/native";
import { branco, cinza, complementar, corPrimaria } from "../../../Global";
import { Button, TextInput } from "@react-native-material/core";

export const ViewContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${corPrimaria};
`;
export const FlatContainer = styled.View`
  width: 100%;
  height: 100%;
  align-self: center;
  background-color: ${corPrimaria};
`;

export const Titulo = styled.Text`
  color: ${complementar};
  font-weight: 800;
  align-self: center;
  font-size: 30px;
`;
export const ViewFlat = styled.ScrollView`
  width: 100%;
  background-color: ${branco};
  padding: 10px;
  align-content: center;
`;
export const ContainerFooter = styled.View`
  width: 100%;
  background-color: ${corPrimaria};
  flex-direction: row;
  justify-content: space-evenly;
  padding: 10px;
  align-content: center;
`;
export const FlatRow = styled.Text`
  color: ${complementar};
  align-self: center;
  font-weight: 800;
  margin: 5px;
  font-size: 15px;
`;

export const ImageRow = styled.Image`
  align-self: center;
`;

export const InputLevel = styled(TextInput)`
  width: 70%;
  margin-right: 5px;
  padding: 0;
`;

export const Botao = styled(Button)`
  background-color: ${complementar};
  width: 33%;
  margin-top: 3px;
  padding: 5px;
  margin-bottom: 10px;
`;
export const BotaoLogout = styled(Button)`
  background-color: ${complementar};
  margin-top: 3px;
  width: 50%;
  margin-bottom: 10px;
`;
export const BotaoSecundario = styled(Button)`
  background-color: ${cinza};
  margin-top: 3px;
  padding: 5px;
  margin-bottom: 10px;
`;
