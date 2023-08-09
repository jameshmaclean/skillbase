import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api";
export const listarSkills = async () => {
  const dataStr = await AsyncStorage.getItem("userData");
  const data = JSON.parse(dataStr);
  api.defaults.headers.common.Authorization = data.accessToken
    ? `Bearer ${data.accessToken}`
    : "";
  const response = await api.get("/skills/listarTodas");
  const skills = response.data;
  return skills;
};

export const listarSkillsUsuario = async (id) => {
  const dataStr = await AsyncStorage.getItem("userData");
  const data = JSON.parse(dataStr);
  api.defaults.headers.common.Authorization = data.accessToken
    ? `Bearer ${data.accessToken}`
    : "";
  const response = await api.get("/userskill", { params: { idUsuario: id } });
  const skills = response.data;
  return skills;
};
