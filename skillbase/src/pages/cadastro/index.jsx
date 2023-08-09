import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { FormControl, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import { cadastrar } from "../../services/auth/AuthService";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    role: ["user"],
  });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = useState(false);
  const openToast = (severity, message) => {
    setToastSeverity(severity);
    setToastMessage(message);
    setToastOpen(true);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordRepeat = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleUsername = (e) => {
    setUsuario({ ...usuario, username: e.target.value });
  };

  const handlePasswordInput = (e) => {
    setUsuario({ ...usuario, password: e.target.value });
  };

  const handleRepeatPassword = (e) => {
    setPasswordRepeat(e.target.value);
  };

  const handleEmailInput = (e) => {
    setUsuario({ ...usuario, email: e.target.value });
  };

  const handleSubmit = async () => {
    if (usuario.username === "") {
      setUserNameError(true);
      return;
    }
    if (usuario.password === "") {
      setPasswordError(true);
      return;
    }
    if (usuario.email === "") {
      setEmailError(true);
      return;
    }
    if (passwordRepeat === "") {
      setPasswordRepeatError(true);
      return;
    } else if (passwordRepeat === usuario.password) {
      setLoading(true);
      console.log(usuario);
      try {
        const data = await cadastrar(usuario);
        console.log(data);
        openToast("success", "Cadastro realizado com sucesso!");
        setLoading(false);
        setUsuario({ username: "", email: "", password: "", role: ["user"] });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        setLoading(false);
        openToast("error", "Erro ao cadastrar. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="container">
      <div className="box-cadastro">
        <div className="inputs">
          <h1 className="titulo">Cadastrar-se</h1>
          <Snackbar
            open={toastOpen}
            autoHideDuration={3000}
            onClose={() => setToastOpen(false)}
            anchorOrigin={{vertical:"top", horizontal:"center"}}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setToastOpen(false)}
              severity={toastSeverity}
            >
              {toastMessage}
            </MuiAlert>
          </Snackbar>
          <FormControl error>
            <TextField
              size="small"
              required
              error={userNameError}
              id="outlined-required"
              label="Usuário"
              value={usuario.username}
              onChange={handleUsername}
              helperText={usuario.username === "" ? "Digite o login" : " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle className="icons" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              error={emailError}
              required
              id="outlined-required"
              label="E-mail"
              type="e-mail"
              onChange={handleEmailInput}
              value={usuario.email}
              helperText={usuario.email === "" ? "Digite o email" : " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AlternateEmail className="icons" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <TextField
            size="small"
            required
            error={passwordError}
            label="Senha"
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
          <TextField
            size="small"
            required
            error={passwordRepeatError}
            label="Digite novamente a senha"
            helperText={
              passwordRepeat === "" ? "Digite novamente a senha" : " "
            }
            type={showRepeatPassword ? "text" : "password"} // <-- This is where the magic happens
            onChange={handleRepeatPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Visualizar a senha"
                    onClick={handleClickShowPasswordRepeat}
                    style={{ color: "var(--complementar)" }}
                  >
                    {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button
            className="botao-entrar"
            onClick={handleSubmit}
            disabled={loading}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
