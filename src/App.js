import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import MyContext from './context';
import Mysnackbar from "./components/MUI/Mysnackbar/Mysnackbar";
import Main from "./components/Main/Main";
import Registration from './components/Registration/Registration';
import Authorization from "./components/Authorization/Authorization";
import logoHospital from './img/logohospital.png'
import './App.scss';

const App = () => {
  const navigate = useNavigate();

  const {
    flagHeader,
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
    // setFlagHeader('authorization')
  }

  return (
    <div className="App">
      <header>
        <div className="header-wrap">
          <img src={logoHospital} alt="LogoHospital" className='main-logo' />
          <div className='headerTitle'>{textHeader}</div>
        </div>
        {flagHeader === 'login' && (
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
        <Route path='/main' element={
          <Main />
        } />
      </Routes>
    </div>
  );
}

export default App;
