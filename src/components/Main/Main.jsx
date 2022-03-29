import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import moment from "moment";
import MyContext from "../../context";
import RenderRecords from "../RenderRecords/RenderRecords";
import './Main.scss'

const Main = () => {
  const [newDate, setNewDate] = useState('');

  const {
    setMySnackBar,
    setMessageSnackBar,
    setNewRecord,
    loginStorage,
  } = useContext(MyContext);

  useEffect(() => {
    setNewDate(now.format('yyyy-MM-DD'));
  }, [])

  const now = moment();

  const changeDateInput = (event) => {
    setNewDate(event.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:9000/allRecords').then(res => {
      setNewRecord(res.data.data);
    });
  }, [setNewRecord])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const doctor = formData.get('doctor');
    const date = formData.get('date').split('-').reverse().join('.');
    const comment = formData.get('comment');
    addNewRecord(name, doctor, date, comment, formData);
  }

  const addNewRecord = async (name, doctor, date, comment) => {

    if (name !== '' && doctor !== '' && date !== '' && comment !== '') {
      await axios.post('http://localhost:9000/createRecord', {
        name,
        doctor,
        date,
        comment,
        loginStorage
      }).then(res => {
        setNewRecord(res.data.data);
        // setNewToken(res.data);
      })
    } else {
      setMessageSnackBar(" Пожалуйста заполните все поля записи !");
      setMySnackBar({ open: true })
    }
  }

  return (
    <>
      <div className="wrapper-main">
        <form onSubmit={handleSubmit} className="main-form">
          <div className="main-form__wrapper">
            <label>Имя:</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder="Введите ФИО"
            ></input>
          </div>
          <div className="main-form__wrapper">
            <label>Врач:</label>
            <select
              id='doctor'
              name='doctor'
            >
              <option value="Дядя Жора">Дядя Жора</option>
              <option value="Отец Варта">Отец Вартан</option>
              <option value="Варфаламей Петров">Варфаламей Петров</option>
              <option value="Ivan">Ivan</option>
            </select>
          </div>
          <div className="main-form__wrapper">
            <label>Дата:</label>
            <input
              type='date'
              id='date'
              name='date'
              placeholder="Введите дату"
              value={newDate}
              // .split('.').reverse().join('-')
              onChange={(e) => changeDateInput(e)}
            ></input>
          </div>
          <div className="main-form__wrapper">
            <label>Жалобы:</label>
            <input
              type='text'
              id='comment'
              name='comment'
              placeholder="Введите жалобу"
            ></input>
          </div>
          <button>Добавить</button>
        </form>
      </div>
      <RenderRecords />
    </>
  )
}

export default Main;