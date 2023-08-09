import React from "react";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../../../Global.css";

const LoginForm = ({
  usuario,
  handleLoginInput,
  userNameError,
  handlePasswordInput,
  passwordError,
  handleSubmit,
  showPassword,
  handleClickShowPassword,
  handleGravarCheck,
  gravarSenha,
  navigate,
}) => {
  LoginForm.propTypes = {
    usuario: PropTypes.object.isRequired,
    handleLoginInput: PropTypes.func.isRequired,
    userNameError: PropTypes.bool.isRequired,
    handlePasswordInput: PropTypes.func.isRequired,
    passwordError: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    showPassword: PropTypes.bool.isRequired,
    handleClickShowPassword: PropTypes.func.isRequired,
    handleGravarCheck: PropTypes.func.isRequired,
    gravarSenha: PropTypes.bool.isRequired,
    navigate: PropTypes.func.isRequired,
  };
  return (
    <div className="inputs">
      <h1>Bem vindo :)</h1>
      <FormControl error>
        <TextField
          size="small"
          required
          id="outlined-required"
          label="Usuário"
          value={usuario.username}
          onChange={handleLoginInput}
          error={userNameError}
          helperText={usuario.username === "" ? "Digite o login" : " "}
        />
      </FormControl>
      <TextField
        size="small"
        label="Senha"
        value={usuario.password}
        error={passwordError}
        helperText={usuario.password === "" ? "Digite a senha" : " "}
        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
        onChange={handlePasswordInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Visualizar a senha"
                onClick={handleClickShowPassword}
                style={{ color: "var(--complementar)" }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormGroup className="lembrar">
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleGravarCheck}
              checked={gravarSenha}
              style={{ color: "var(--complementar)" }}
            />
          }
          label="Gravar senha?"
        />
      </FormGroup>
      <button className="botao-entrar" onClick={handleSubmit}>
        Entrar
      </button>
      <p className="registrar" onClick={() => navigate("/cadastrar")}>
        Não tem uma conta? Cadastre-se
      </p>
    </div>
  );
};

export default LoginForm;
