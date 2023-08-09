import { api } from "../api";

export const logar = async (usuario) => {
  try {
    const response = await api.post("/auth/signin", usuario);
    const data = response.data;
    localStorage.setItem("userData", JSON.stringify(data));
    api.defaults.headers.common['Authorization'] = data.accesToken;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const cadastrar = async (usuario) => {
  try {
    const response = await api.post("/auth/signup", usuario);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};