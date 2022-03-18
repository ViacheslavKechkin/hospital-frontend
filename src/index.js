import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import MyContext from "./context"
import App from './App';
import './index.scss';

const Main = () => {
  return (
    <React.StrictMode>
      <MyContext.Provider value={'#'}>
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
