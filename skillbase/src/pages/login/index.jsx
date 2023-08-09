import { useEffect, useState, useContext } from "react";
import "./index.css";
import UserContext from "../../contexts/userContext";
import { logar } from "../../services/auth/AuthService";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const Login = () => {
  const [usuario, setUsuario] = useState({ username: "", password: "" });
  const [open, setOpen] = useState(false);
  const [userNameError, setuserNameError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [gravarSenha, setGravarSenha] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginInput = (e) => {
    setUsuario({ ...usuario, username: e.target.value });
    setuserNameError(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleGravarCheck = () => {
    setGravarSenha(!gravarSenha);
    if (!gravarSenha) {
      localStorage.setItem("dados", JSON.stringify(usuario));
    } else if (gravarSenha) {
      localStorage.removeItem("dados");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("dados")) {
      setGravarSenha(true);
    } else {
      setGravarSenha(false);
    }
    if (gravarSenha) {
      setUsuario(
        JSON.parse(localStorage.getItem("dados")) || {
          username: "",
          password: "",
        }
      );
    } else {
      setUsuario({ username: "", password: "" });
    }
  }, [gravarSenha]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordInput = (e) => {
    setUsuario({ ...usuario, password: e.target.value });
    setpasswordError(false);
  };

  const handleSubmit = async () => {
    if (usuario.username === "") {
      setuserNameError(true);
      return;
    }
    if (usuario.password === "") {
      setpasswordError(true);
      return;
    } else {
      const data = await logar(usuario);
      if (data) {
        setUser(data);
        navigate("/inicio");
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="box-login">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Usuario e/ou senha incorretos
          </Alert>
        </Snackbar>
        <LoginForm
          usuario={usuario}
          handleLoginInput={handleLoginInput}
          userNameError={userNameError}
          handlePasswordInput={handlePasswordInput}
          passwordError={passwordError}
          handleSubmit={handleSubmit}
          handleClickShowPassword={handleClickShowPassword}
          showPassword={showPassword}
          handleGravarCheck={handleGravarCheck}
          gravarSenha={gravarSenha}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Login;
