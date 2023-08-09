import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import "./index.css";
import UserContext from "../../contexts/userContext";
import { associarSkill } from "../../services/userSkill/userSkillService";

const ModalAdicionar = ({ skills, setUserSkills, userSkills }) => {
  const [open, setOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [skillSelecionada, setSkillSelecionada] = useState("");
  const [level, setLevel] = useState("");
  const { user } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(skills);
  };
  const handleCloseSnack = () => {
    setSnackOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setSkillSelecionada(e.target.value);
  };
  const handleLevelChange = (e) => {
    setLevel(parseInt(e.target.value));
  };
  const handleSalvar = async () => {
    if (skillSelecionada == "" || level == "") {
      setSnackOpen(true);
    } else {
      const objeto = {
        idUsuario: user.id,
        idSkill: skillSelecionada,
        level: level,
      };
      const idSkill = skills.find(
        (skill) => skill.idSkill === skillSelecionada
      );
      const response = await associarSkill(objeto);
      const idAssociacao = response.data.idAssociacao;
      console.log(idAssociacao);
      const novaAssociacao = {
        usuario: user.username,
        nomeSkill: idSkill.nome,
        descricaoSkill: idSkill.descricao,
        levelSkill: level,
        imagemURL: idSkill.imagemURL,
        idAssociacao: idAssociacao,
      };
      setUserSkills([...userSkills, novaAssociacao]);
      setSkillSelecionada("");
      setLevel("");
      setOpen(false);
    }
  };

  return (
    <div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Preencha todos os campos
        </Alert>
      </Snackbar>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="botaoModal"
      >
        Adicionar skills
      </Button>
      <Dialog className="modal" open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            backgroundColor: "var(--complementar)",
            color: "var(--cinza)",
          }}
        >
          Adicionar skills
        </DialogTitle>
        <DialogContent style={{ justifyContent: "center", backgroundColor: "var(--cinza)" }}>
          <DialogContentText mt={1}>
            Para adicionar uma skill, selecione-a na lista e depois digite o
            level para essa skill
          </DialogContentText>
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }}>
            <InputLabel
              id="label"
              style={{ marginBottom: "100px" }}
              label="skill"
              size="small"
            >
              Skill
            </InputLabel>
            <Select
              id="select"
              value={skillSelecionada}
              onChange={handleChange}
              size="small"
              label="Skill"
              error={skillSelecionada == ""}
            >
              <MenuItem value="">
                <em>Selecione uma skill</em>
              </MenuItem>
              {skills.map((skill) => {
                return (
                  <MenuItem key={skill.idSkill} value={skill.idSkill}>
                    {skill.nome}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>Selecione uma skill na caixa acima</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }}>
            <InputLabel id="Level" />
            <TextField
              error={level == null}
              type="number"
              label="Level"
              size="small"
              inputProps={{ min: 0, max: 10 }}
              value={level}
              onChange={handleLevelChange}
            ></TextField>
            <FormHelperText>De 1 a 10</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions style={{backgroundColor: "var(--cinza)"}}>
          <Button
            size="small"
            className="botaoModal"
            onClick={handleSalvar}
            variant="outlined"
          >
            Salvar
          </Button>
          <Button
            size="small"
            className="botaoModalCancelar"
            onClick={handleClose}
            variant="outlined"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ModalAdicionar;
