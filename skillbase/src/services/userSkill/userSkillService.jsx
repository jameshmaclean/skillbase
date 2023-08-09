import { api } from "../api";

export const associarSkill = async (associacao) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.accessToken;
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
  const response = api.post("/userskill/cadastrar", associacao);
  return response;
};

export const editarAssociacao = async (idAssociacao, skill) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.accessToken;
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
  const response = await api.put("/userskill/editar", skill, { params: { idAssociacao: idAssociacao } });
  return response.data;
};

export const deletarAssociacao = async (idAssociacao) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData.accessToken;
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
  const response = await api.delete("/userskill/deletar",{ params: { idAssociacao: idAssociacao } });
  return response.data;
};
