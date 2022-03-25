import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import MyContext from "./context"
import App from './App';
import './index.scss';

const Main = () => {
  //the flag will change on the login page when you click on register 
  //change to authorization when will the login page be ready
  const [flagHeader, setFlagHeader] = useState('authorization');
  const [textHeader, setTextHeader] = useState('Войти в систему');
  const [users, setUsers] = useState([]);
  const [mySnackBar, setMySnackBar] = useState({ open: false });
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [newToken, setNewToken] = useState('');

  return (
    <React.StrictMode>
      <MyContext.Provider value={{
        newToken,
        setNewToken,
        users,
        setUsers,
        setMySnackBar,
        flagHeader,
        setFlagHeader,
        textHeader,
        setTextHeader,
        mySnackBar,
        messageSnackBar,
        setMessageSnackBar
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
