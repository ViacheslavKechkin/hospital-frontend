import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import MyContext from './context';
import Mysnackbar from "./components/MUI/Mysnackbar/Mysnackbar";
import MainPage from "./components/MainPage/MainPage";
import Registration from './components/Registration/Registration';
import Authorization from "./components/Authorization/Authorization";
import logoHospital from './img/logohospital.png'
import './App.scss';

const App = () => {
  const navigate = useNavigate();

  const {
    flagHeader,
    setFlagHeader,
    mySnackBar,
    setMySnackBar,
    setUsers,
    textHeader,
    setTextHeader,
  } = useContext(MyContext);

  const { open } = mySnackBar;

  const handleCloseBar = () => {
    setMySnackBar({ open: false });
  };

  useEffect(() => {
    axios.get('http://localhost:9000/allUsers').then(res => {
      setUsers(res.data.data);
    });
  }, [setUsers])

  if (flagHeader === 'authorization') {
    setTextHeader('Войти в систему')
  }
  if (flagHeader === 'registration') {
    setTextHeader('Зарегистрироваться в системе')
  }
  if (flagHeader === 'login') {
    setTextHeader('Приемы')
  }

  const exitOnMain = () => {
    navigate('/')
    localStorage.setItem("token", '')
    setFlagHeader('authorization')
    setTextHeader('Войти в систему')
  }

  return (
    <div className="App">
      <header>
        <div className="header-wrap">
          <img src={logoHospital} alt="LogoHospital" className='main-logo' />
          <div className='headerTitle'>{textHeader}</div>
        </div>
        {localStorage.getItem("token") !== '' && (
          <button className="main-btn_top" onClick={() => exitOnMain()}>Выход</button>
        )
        }
      </header>
      <Mysnackbar
        open={open}
        handleCloseBar={handleCloseBar}
      />
      <Routes>
        <Route path='/registration' element={
          <Registration />
        } />
        <Route path='/' element={
          <Authorization />
        } />
        {localStorage.getItem("token") ?
          <Route path='/main' element={
            <MainPage />
          } /> : <Route path='/' element={
            <Authorization />
          } />
        }
      </Routes>
    </div>
  );
}

export default App;
