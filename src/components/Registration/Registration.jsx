import React from "react";
import mainImg from '../../img/mainImg.png'
import './Registration.scss';

const Registration = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get('email'));
    console.log(formData.get('password'));
  }

  return (
    <div className="wrapper-registration">
      <img src={mainImg} alt="mainImg" />
      <div className="block-form">
        <form onSubmit={handleSubmit}>
          <label>Login:</label>
          <input type='email' id='email' name='email' />
          <label>Password:</label>
          <input type='text' id='password' name='password' />
          <label>Repeat password:</label>
          <input type='text' id='password' name='password' />
          <button>Login</button>
        </form>
        <button>Авторизоваться</button>
      </div>
    </div>
  )
}

export default Registration;