import { Button } from "@react-native-material/core";
import { styled } from "styled-components/native";
import { branco, cinza, complementar, corPrimaria } from "../../../Global";

export const Botao = styled(Button)`
  background-color: ${complementar};
  margin-top: 3px;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
`;
export const BotaoSecundario = styled(Button)`
  background-color: ${cinza};
  width: 50%;
  margin-top: 3px;
  padding: 5px;
  margin-bottom: 10px;
`;
export const ContainerModal = styled.View`
  background-color: ${corPrimaria};
  flex: 1;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
export const ContainerItems = styled.View`
  background-color: ${corPrimaria};
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;
export const ContainerInputs = styled.View`
  background-color: ${corPrimaria};
  width: 100%;
  gap: 20px;
  margin-bottom: 100px;
  padding: 10px;
`;
export const FooterModal = styled.View`
  background-color: ${corPrimaria};
  width: 100%;
  padding: 10px;
`;
export const ContainerTitulo = styled.View`
  background-color: ${corPrimaria};
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
export const Titulo = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: ${complementar};
  align-self: center;
`;
export const Level = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${complementar};
  align-self: flex-start;
`;
