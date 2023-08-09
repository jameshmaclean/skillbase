import styled from "styled-components/native"
import { cinza, complementar, corPrimaria } from "../../../Global"
import { Button, TextInput } from "@react-native-material/core"

export const ViewContainer = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${cinza};
    justify-content: center;
    align-items: flex-start; 
`

export const ContainerLogo = styled.View`
    width: 100%;
    height: 20%;
    align-items: center;
    justify-content: center;
`

export const ContainerInput = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`
export const Titulo = styled.Text`
    font-size: 20px;
    color: ${corPrimaria};
    font-weight: 800;
    margin-bottom: 50px;
    align-self: center;

`

export const Logo = styled.Image`
    width: 80%; 
    height: 100%;
`

export const Input = styled(TextInput)`
    width: 75%;
    margin-top: 10px;
`

export const BotaoCadastrar = styled(Button)`
    width: 75%;
    background-color: ${complementar};
    margin-top: 10px;
`
