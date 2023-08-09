import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import RotasPrivadas from "../RotasPrivadas";
import RotasPublicas from "../RotasPublicas";

const Rotas = () => {
  const { user } = useContext(UserContext);
  return <>{user == null ? <RotasPublicas /> : <RotasPrivadas />}</>;
};

export default Rotas;
