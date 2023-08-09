import { TextInput } from "@react-native-material/core";
import React, { useState, useContext } from "react ";
import { Modal, View, Alert, ToastAndroid, Image } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import SelectDropdown from "react-native-select-dropdown";
import { associarSkill } from "../../services/userSkills/UserSkillService";
import {
  Botao,
  BotaoSecundario,
  ContainerInputs,
  ContainerItems,
  ContainerModal,
  ContainerTitulo,
  FooterModal,
  Level,
  Titulo,
} from "./styles";
import { complementar, corPrimaria, corSecundaria } from "../../../Global";

export const ModalAdicionar = ({ skills, setUserSkills, userSkills }) => {
  const [visible, setVisible] = useState(false);
  const [skillSelecionada, setSkillSelecionada] = useState("");
  const showToast = (status) => {
    if (status == 200) {
      ToastAndroid.show("Skill adicionada com sucesso!", ToastAndroid.TOP);
    }
  };
  const [level, setLevel] = useState("");
  const { user } = useContext(UserContext);
  const handleLevel = (text) => {
    setLevel(text);
  };
  const handleSalvar = async () => {
    if (!skillSelecionada || level === "") {
      Alert.alert("Erro", "Por favor selecione uma skill e digite o level");
      return;
    }
    const objeto = {
      idUsuario: user.id,
      idSkill: skillSelecionada,
      level: level,
    };
    const idSkill = skills.find((skill) => skill.idSkill === skillSelecionada);
    const data = await associarSkill(objeto);
    const idAssociacao = await data.data.idAssociacao;
    const novaAssociacao = {
      usuario: user.username,
      nomeSkill: idSkill.nome,
      descricaoSkill: idSkill.descricao,
      levelSkill: level,
      imagemURL: idSkill.imagemURL,
      idAssociacao: idAssociacao,
    };
    setUserSkills([...userSkills, novaAssociacao]);
    showToast(data.status);
    if (data.status == 200) {
      setLevel("");
      setSkillSelecionada("");
      setVisible(false);
    }
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <ContainerModal>
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 450, height: 280 }}
            resizeMode="cover"
          />
          <ContainerItems>
            <ContainerTitulo>
              <Titulo>Adicionar Skill</Titulo>
            </ContainerTitulo>
            <ContainerInputs>
              <SelectDropdown
                buttonStyle={{ width: "100%", alignSelf: "flex-start" }}
                data={skills}
                buttonTextStyle={{ color: complementar, fontSize:15 }}
                defaultButtonText="Selecione uma skill"
                rowTextStyle={{ color: complementar }}
                buttonTextAfterSelection={(item) => {
                  return item.nome;
                }}
                rowTextForSelection={(item, index) => {
                  return item.nome;
                }}
                onSelect={(item) => {
                  setSkillSelecionada(item.idSkill);
                }}
              />
              <TextInput
                placeholder="Digite o level"
                placeholderTextColor={complementar}
                inputStyle={{ textAlign: "center" }}
                keyboardType="number-pad"
                value={level}
                onChangeText={handleLevel}
                style={{ width: "100%", alignSelf: "flex-start" }}
              />
            </ContainerInputs>
            <FooterModal>
              <Botao
                style={{ width: "100%" }}
                onPress={handleSalvar}
                title="Salvar"
              />
              <BotaoSecundario
                style={{ width: "100%" }}
                onPress={() => setVisible(!visible)}
                title="Cancelar"
                titleStyle={{ color: complementar }}
              />
            </FooterModal>
          </ContainerItems>
        </ContainerModal>
      </Modal>
      <Botao onPress={() => setVisible(true)} title="Adicionar skills" />
    </View>
  );
};
