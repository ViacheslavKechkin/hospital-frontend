import React, { useContext, useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from "react-router-dom";
import axios from "axios";
import routes from "./routes";
import MyContext from "./context";
import Mysnackbar from "./components/MUI/Mysnackbar/Mysnackbar";
import logoHospital from "./img/logohospital.png";
import "./App.scss";

const App = () => {
  const location = useLocation();
  let headerText = "";

  const navigate = useNavigate();

  const routing = useRoutes(routes());

  const {
    mySnackBar,
    setMySnackBar,
    setUsers,
  } = useContext(MyContext);

  const { open } = mySnackBar;

  const handleCloseBar = () => {
    setMySnackBar({ open: false });
  };

  useEffect(() => {
    axios.get("http://localhost:9000/allUsers").then((res) => {
      setUsers(res.data.data);
    });
  }, [setUsers]);

  switch (location.pathname) {
    case "/":
      headerText = "Войти в систему";
      break;
    case "/registration":
      headerText = "Зарегистрироваться в системе";
      break;
    case "/main":
      headerText = "Приемы";
      break;
    default:
      headerText = "Страница не найдена";
      break;
  }

  const exitOnMain = () => {
    navigate("/");
    localStorage.setItem("token", "");
  };

  return (
    <div className="App">
      <header>
        <div className="header-wrap">
          <img src={logoHospital} alt="LogoHospital" className="main-logo" />
          <div className="headerTitle">{headerText}</div>
        </div>
        {localStorage.getItem("token") && (
          <button className="main-btn_top" onClick={() => exitOnMain()}>
            Выход
          </button>
        )}
      </header>
      <Mysnackbar open={open} handleCloseBar={handleCloseBar} />
      {routing}
    </div>
  );
};

export default App;
