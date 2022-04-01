import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import MyContext from "./context"
import App from './App';
import './index.scss';

const Main = () => {
  const [flagHeader, setFlagHeader] = useState('authorization');
  const [textHeader, setTextHeader] = useState('Войти в систему');
  const [users, setUsers] = useState([]);
  const [mySnackBar, setMySnackBar] = useState({ open: false });
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [loginStorage, setLoginStorage] = useState('');

  return (
    <React.StrictMode>
      <MyContext.Provider value={{
        users,
        setUsers,
        setMySnackBar,
        flagHeader,
        setFlagHeader,
        textHeader,
        setTextHeader,
        mySnackBar,
        messageSnackBar,
        setMessageSnackBar,
        loginStorage,
        setLoginStorage,
      }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyContext.Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

reportWebVitals();
