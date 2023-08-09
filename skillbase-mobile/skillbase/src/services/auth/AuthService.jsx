import { api } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logar = async (usuario) => {
  try {
    const response = await api.post("/auth/signin", usuario);
    const data = response.data;
    if (response.status == 200) {
      AsyncStorage.setItem("userData", JSON.stringify(data));
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const cadastrar = async (usuario) => {
  console.log(usuario);
  try {
    const response = await api.post("/auth/signup", usuario);
    const data = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
