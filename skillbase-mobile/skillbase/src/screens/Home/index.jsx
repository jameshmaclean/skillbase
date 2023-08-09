import React, { useContext, useState, useEffect } from "react";
import {
  Botao,
  ContainerFooter,
  BotaoLogout,
  BotaoSecundario,
  FlatContainer,
  FlatRow,
  ImageRow,
  InputLevel,
  Titulo,
  ViewContainer,
  ViewFlat,
} from "./styles";
import { UserContext } from "../../contexts/UserContext";
import { Button, Divider, Text } from "@react-native-material/core";
import {
  listarSkills,
  listarSkillsUsuario,
} from "../../services/skills/SkillService";
import {
  editarAssociacao,
  deletarAssociacao,
} from "../../services/userSkills/UserSkillService";
import { FlatList, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalAdicionar } from "../../components/ModalAdicionar";
import { cinza, complementar } from "../../../Global";
const Home = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [skills, setSkills] = useState([]);
  const [skillsUser, setSkillsUser] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [level, setLevel] = useState(0);
  const setLevelValue = (text) => {
    const parsedLevel = parseInt(text);
    if (!isNaN(parsedLevel) && parsedLevel >= 1 && parsedLevel <= 10) {
      setLevel(parsedLevel);
    } else {
      setLevel(0);
    }
  };

  useEffect(() => {
    const carregarSkills = async () => {
      const listaSkill = await listarSkills();
      setSkills(listaSkill);
    };
    carregarSkills();
  }, []);

  const handleExcluir = async (idAssociacao) => {
    const novaLista = skillsUser.filter(
      (skill) => skill.idAssociacao !== idAssociacao
    );
    setSkillsUser(novaLista);
    await deletarAssociacao(idAssociacao);
  };

  useEffect(() => {
    const carregarSkillsUsuario = async () => {
      const listaSkill = await listarSkillsUsuario(user.id);
      setSkillsUser(listaSkill);
    };
    carregarSkillsUsuario();
  }, []);

  const handleEdit = (skill) => {
    if (editingSkillId === skill.idSkill) {
      setIsEditing(false);
      setEditingSkillId(null);
      setLevel(0);
    } else {
      setIsEditing(true);
      setEditingSkillId(skill.idSkill);
      setLevel(skill.levelSkill);
    }
  };

  const handleSubmit = async (idAssociacao) => {
    if (level >= 0 && level <= 10) {
      const updatedSkillsUser = skillsUser.map((associacao) => {
        if (idAssociacao === associacao.idAssociacao) {
          return {
            ...associacao,
            levelSkill: level,
          };
        }
        return associacao;
      });
      setSkillsUser(updatedSkillsUser);

      const data = await editarAssociacao(idAssociacao, {
        idUsuario: user.id,
        idSkill: editingSkillId,
        level: level,
      });

      setIsEditing(false);
      setEditingSkillId(null);
      setLevel(0);
    } else {
      console.log("Nível inválido. O nível deve estar entre 0 e 10.");
    }
  };
  const handleLogout = () => {
    setUser(null);
    AsyncStorage.removeItem("userData");
    navigation.navigate("Login");
  };

  const renderItem = ({ item }) => (
    <ViewFlat>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ImageRow
          source={{ uri: "http://10.0.2.2:8080/api/skills/foto/4" }}
          style={{ width: 120, height: 120 }}
        />
        <View style={{ flex: 1 }}>
          <FlatRow>{item.nomeSkill}</FlatRow>
          <FlatRow>{item.descricaoSkill}</FlatRow>
          <FlatRow>
            Level {editingSkillId === item.idSkill ? level : item.levelSkill}
          </FlatRow>
        </View>
      </View>
      <Divider
        style={{
          height: 1,
          backgroundColor: "var(--complementar)",
          marginBottom: 10,
          marginTop: 10,
          width: "100%",
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        {editingSkillId === item.idSkill ? (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <InputLevel
              variant="standard"
              label="Level"
              blurOnSubmit={true}
              inputStyle={{ backgroundColor: "white" }}
              value={
                editingSkillId === item.idSkill
                  ? level.toString()
                  : item.levelSkill.toString()
              }
              onChangeText={setLevelValue}
              keyboardType="numeric"
            />
            <Button
              title="Salvar"
              variant="contained"
              onPress={() => handleSubmit(item.idAssociacao)}
              style={{
                backgroundColor: complementar,
                alignContent: "center",
                justifyContent: "center",
                marginBottom: 5,
                height: 48,
              }}
            ></Button>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Botao
              title="Editar"
              variant="outlined"
              titleStyle={{ color: cinza }}
              onPress={() => handleEdit(item)}
            />
            <BotaoSecundario
              onPress={() => handleExcluir(item.idAssociacao)}
              titleStyle={{ color: complementar }}
              variant="contained"
              title="Excluir"
            />
          </View>
        )}
      </View>
    </ViewFlat>
  );

  return (
    <ViewContainer>
      <FlatContainer>
        {skillsUser.length > 0 ? (
          <FlatList
            ItemSeparatorComponent={Divider}
            scrollEnabled={!isEditing}
            data={skillsUser}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <Titulo>SEM SKILL ADICIONADA</Titulo>
        )}
        <ContainerFooter>
          <ModalAdicionar
            skills={skills}
            setUserSkills={setSkillsUser}
            userSkills={skillsUser}
          />
          <BotaoLogout
            title="Deslogar"
            onPress={handleLogout}
            style={{ backgroundColor: cinza }}
            titleStyle={{ color: complementar, marginTop: 10 }}
          />
        </ContainerFooter>
      </FlatContainer>
    </ViewContainer>
  );
};
export default Home;
