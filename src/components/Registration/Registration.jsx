import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyContext from "../../context";
import mainImg from '../../img/mainImg.png'
import './Registration.scss';

const Registration = () => {
  const navigate = useNavigate();

  const {
    setUsers,
    setFlagHeader,
    setMySnackBar,
    setMessageSnackBar,
    setUserId
  } = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');
    addNewUser(email, password, repeatPassword);
  }

  const addNewUser = async (email, password, repeatPassword) => {
    // const pattern = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}/g;
    const patternOnLogin = /^.{6,}$/;

    if (email === "") {
      setMessageSnackBar(" Пожалуйста, напишите почту !");
      return setMySnackBar({ open: true })
    }
    if (password === "") {
      setMessageSnackBar(" Пожалуйста, напишите пароль !");
      return setMySnackBar({ open: true })
    }
    if (repeatPassword === "") {
      setMessageSnackBar(" Пожалуйста, повторите пароль !");
      return setMySnackBar({ open: true })
    }
    if (password !== repeatPassword) {
      setMessageSnackBar(" Пожалуйста, введите одинаковые пароли !");
      return setMySnackBar({ open: true })
    }
    if (email === '' && password === '' && repeatPassword === '') {
      setMessageSnackBar(" Пожалуйста заполните все поля регистрации !");
      setMySnackBar({ open: true })
    }

    if (email !== '' && password !== '' && repeatPassword !== '' && patternOnLogin.test(email)) {
      localStorage.setItem("email", email);
      await axios.post('http://localhost:9000/createUser', {
        email,
        password
      }).then(res => {
        setUsers(res.data.data);
        setUserId(res.data.user._id)
        localStorage.setItem("token", res.data.token);
      })
        .catch(() => {
          setMessageSnackBar(" Пользователь с таким именем уже существует!");
          setMySnackBar({ open: true })
          localStorage.setItem("token", '');
        })
    } if (!patternOnLogin.test(email)) {
      setMessageSnackBar(" Email должен быть минимум 6 символов !");
      return setMySnackBar({ open: true })
    } 
    // if (!pattern.test(password)) {
    //   setMessageSnackBar("Пароль должн быть не меньше 6 символов, должен состоять из латинских символов и содержать хотя бы 1 число.!");
    //   return setMySnackBar({ open: true })
    // }

    if (localStorage.getItem("token") && patternOnLogin.test(email)) {
      navigate('/main')
      setFlagHeader('login')
    }
  }

  return (
    <div className="wrapper-registration">
      <img src={mainImg} alt="mainImg" />
      <div className="block-form">
        <div className="block-form__title">Регистрация</div>
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
          <label>Repeat password:</label>
          <input
            type='password'
            id='repeatPassword'
            name='repeatPassword'
            placeholder="Password" />
          <button>Зарегистрироваться</button>
        </form>
        <Link to={'/'}>
          <button className="btn-authorization" onClick={() => setFlagHeader('authorization')}>
            Авторизоваться
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Registration;