
import React, { useContext, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import axios from "axios";
import MyContext from './context';
import Mysnackbar from "./components/MUI/Mysnackbar/Mysnackbar";
import Registration from './components/Registration/Registration';
import logoHospital from './img/logohospital.png'
import './App.scss';

const App = () => {
  const { flagHeader, mySnackBar, setMySnackBar, users, setUsers } = useContext(MyContext);
  const { open } = mySnackBar;

  const handleCloseBar = () => {
    setMySnackBar({ open: false });
  };

  useEffect(() => {
    axios.get('http://localhost:9000/allUsers').then(res => {
      setUsers(res.data.data);
    });
  }, [setUsers])

  console.log(users);

  return (
    <div className="App">
      <header>
        <img src={logoHospital} alt="LogoHospital" className='main-logo' />
        {flagHeader === 'registration' && (
          <div className='headerTitle'>Зарегистрироваться в системе</div>
        )}
      </header>
      <Mysnackbar
        open={open}
        handleCloseBar={handleCloseBar}
      />
      <Routes>
        <Route path='/' element={'#'} />
        <Route path='/registration' element={
          <Registration />
        } />
      </Routes>
    </div>
  );
}

export default App;
