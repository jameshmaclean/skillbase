import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import "./index.css";
import {
  listarSkills,
  listarSkillsUsuario,
} from "../../services/skills/SkillService";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import ModalAdicionar from "../../components/ModalAdicionar/ModalAdicionar";
import {
  deletarAssociacao,
  editarAssociacao,
} from "../../services/userSkill/userSkillService";
import "../../../Global.css";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [skills, setSkills] = useState([]);
  const [skillsUser, setSkillsUser] = useState([]);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();

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

      console.log("HANDLE SUBMIT", data);
      setIsEditing(false);
      setEditingSkillId(null);
      setLevel(0);
    } else {
      console.log("Nível inválido. O nível deve estar entre 0 e 10.");
    }
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="container-home">
      <div className="bloco-principal">
        {/* <h1>Página inicial</h1> */}
        <div className="separador">
          <div className="titulo">
            <h2>Skills adicionadas: </h2>
          </div>
          {skillsUser.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                borderColor: "var(--complementar)",
                borderRadius: 1,
              }}
              className="container-tabela"
            >
              <Table
                sx={{ minWidth: "100%", width: "10%" }}
                aria-label="simple table"
              >
                <TableHead style={{ backgroundColor: "var(--cor-primaria)" }}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 1 } }}
                  >
                    <TableCell
                      sx={{ color: "var(--cinza)", fontWeight: "600" }}
                      align="center"
                    >
                      Nome
                    </TableCell>
                    <TableCell
                      sx={{ color: "var(--cinza)", fontWeight: "600" }}
                      align="center"
                    >
                      Descrição
                    </TableCell>
                    <TableCell
                      sx={{ color: "var(--cinza)", fontWeight: "600" }}
                      align="center"
                    >
                      Level
                    </TableCell>
                    <TableCell
                      sx={{ color: "var(--cinza)", fontWeight: "600" }}
                      align="center"
                    >
                      Imagem
                    </TableCell>
                    <TableCell
                      sx={{ color: "var(--cinza)", fontWeight: "600" }}
                      align="center"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skillsUser.map((skill, index) => (
                    <TableRow
                      key={skill.idAssociacao}
                      sx={{
                        border: 1,
                        backgroundColor:
                          index % 2 === 0 ? "var(--cinza)" : "var(--terciaria)",
                      }}
                    >
                      <TableCell
                        sx={{
                          color: "var(--complementar)",
                          fontWeight: "500",
                          border: 1,
                          borderColor: "var(--cinza)",
                        }}
                        align="center"
                      >
                        {skill.nomeSkill}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--complementar)",
                          fontWeight: "500",
                          border: 1,
                          borderColor: "var(--cinza)",
                        }}
                        align="center"
                      >
                        {skill.descricaoSkill}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--complementar)",
                          fontWeight: "500",
                          border: 1,
                          borderColor: "var(--cinza)",
                        }}
                        align="center"
                      >
                        {editingSkillId !== skill.idSkill ? (
                          skill.levelSkill
                        ) : (
                          <>
                            <TextField
                              style={{
                                width: "100%",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                              }}
                              inputProps={{
                                min: 0,
                                max: 10,
                              }}
                              type="number"
                              value={level}
                              onChange={(e) => setLevel(e.target.value)}
                              size="small"
                            />
                            <Button
                              className="botao-salvar"
                              onClick={() => handleSubmit(skill.idAssociacao)}
                            >
                              SALVAR
                            </Button>
                          </>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--complementar)",
                          fontWeight: "500",
                          border: 1,
                          borderColor: "var(--cinza)",
                        }}
                        align="center"
                      >
                        <img
                          src={skill.imagemURL}
                          className="imagem"
                          alt="ImagemSkill"
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "var(--complementar)",
                          fontWeight: "500",
                          border: 1,
                          borderColor: "var(--cinza)",
                        }}
                        align="center"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          className="botao-editar"
                          onClick={() => {
                            handleEdit(skill);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          className="botao-excluir"
                          onClick={() => handleExcluir(skill.idAssociacao)}
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>SEM SKILL ADICIONADA</p>
          )}
        </div>
      </div>
      <div className="botoes">
        <ModalAdicionar
          skills={skills}
          setUserSkills={setSkillsUser}
          userSkills={skillsUser}
        />
        <Button
          size="small"
          onClick={handleLogout}
          variant="outlined"
          className="botao-logout"
        >
          Deslogar
        </Button>
      </div>
    </div>
  );
};

export default Home;
