import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyContext from "../../context";
import mainImg from '../../img/mainImg.png'
import './Authorization.scss'

const Authorization = () => {
  const navigate = useNavigate();

  const {
    setFlagHeader,
    setMessageSnackBar,
    setMySnackBar,
    newToken,
    setNewToken,
  } = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    loginOn(email, password);

  }

  const loginOn = async (email, password) => {

    if (email === "") {
      setMessageSnackBar(" Пожалуйста, напишите почту !");
      return setMySnackBar({ open: true })
    }
    if (password === "") {
      setMessageSnackBar(" Пожалуйста, напишите пароль !");
      return setMySnackBar({ open: true })
    }

    if (email !== '' && password !== '') {
      await axios.post('http://localhost:9000/login', {
        email,
        password
      }).then(res => {
        setNewToken(res.data);
      })
      .catch(() => {
        setMessageSnackBar(" Пожалуйста заполните все данные корректно !");
        setMySnackBar({ open: true })
      })
    } else {
      setMessageSnackBar(" Пожалуйста заполните все поля регистрации !");
      setMySnackBar({ open: true })
    }
  }

  if (newToken) {
    navigate('/Main')
    setFlagHeader('login')
  }

  return (
    <div className="wrapper-registration">
      <img src={mainImg} alt="mainImg" />
      <div className="block-form">
        <div className="block-form__title">Войти в систему</div>
        <form onSubmit={handleSubmit}>
          <label>Login:</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder="Login" />
          <label>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder="Password" />
          <button className="button-auth">Войти</button>
        </form>
        <Link to={'/registration'}>
          <button className="btn-registration" onClick={() => setFlagHeader('registration')}>
            Зарегистрироваться
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Authorization;