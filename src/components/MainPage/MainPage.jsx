import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import moment from "moment";
import MyContext from "../../context";
import RenderRecords from "../RenderRecords/RenderRecords";
import './MainPage.scss'

const MainPage = () => {
  const [newRecord, setNewRecord] = useState([]);

  const {
    setMySnackBar,
    setMessageSnackBar,
  } = useContext(MyContext);

  const now = moment();
  const [newDate, setNewDate] = useState(now.format('yyyy-MM-DD'));

  const changeDateInput = (event) => {
    setNewDate(event.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:9000/allRecords', {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then(res => {
        setNewRecord(res.data.data);
      });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let name = formData.get('name');
    let doctor = formData.get('doctor');
    let date = formData.get('date').split('-').reverse().join('.');
    let comment = formData.get('comment');
    addNewRecord(name, doctor, date, comment);
    formData.set(name, '')
  }

  const addNewRecord = async (name, doctor, date, comment) => {
    let email = localStorage.getItem("email");

    if (name !== '' && doctor !== '' && date !== '' && comment !== '') {
      await axios.post('http://localhost:9000/createRecord', {
        name,
        doctor,
        date,
        comment,
        email,
      },
        {
          headers: {
            token: localStorage.getItem("token"),
          }
        }
      ).then(res => {
        setNewRecord(res.data.data);
      })
    } else {
      setMessageSnackBar(" Пожалуйста заполните все поля записи !");
      setMySnackBar({ open: true })
    }
  }

  const option = [
    {
      value: "Дядя Жора",
      text: "Дядя Жора"
    },
    {
      value: "Отец Вартан",
      text: "Отец Вартан"
    },
    {
      value: "Варфаламей Петров",
      text: "Варфаламей Петров"
    },
    {
      value: "Ivan",
      text: "Ivan"
    },
  ]

  const dropdownDoctors = () => {
    return (
      option.map((item, index) => {
        const { value, text } = item;
        return (
          <option key={`idx-${index}`} value={value}>{text}</option>
        )
      })
    )
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
            />
          </div>
          <div className="main-form__wrapper">
            <label>Врач:</label>
            <select
              id='doctor'
              name='doctor'
            >{dropdownDoctors()}
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
              onChange={(e) => changeDateInput(e)}
            />
          </div>
          <div className="main-form__wrapper">
            <label>Жалобы:</label>
            <input
              type='text'
              id='comment'
              name='comment'
              placeholder="Введите жалобу"
            />
          </div>
          <button>Добавить</button>
        </form>
      </div>
      <RenderRecords newRecord={newRecord} />
    </>
  )
}

export default MainPage;