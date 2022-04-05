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

  const doctors = [
    {
      label: "Дядя Жора",
      text: "Дядя Жора"
    },
    {
      label: "Отец Вартан",
      text: "Отец Вартан"
    },
    {
      label: "Варфаламей Петров",
      text: "Варфаламей Петров"
    },
    {
      label: "Ivan",
      text: "Ivan"
    },
  ]

  const dropdownDoctors = () => {
    return (
      doctors.map((item, index) => {
        const { label, text } = item;
        return (
          <option key={`idx-${index}`} value={label}>{text}</option>
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
      <RenderRecords
        doctors={doctors}
        newRecord={newRecord}
        setNewRecord={setNewRecord}
      />
    </>
  )
}

export default MainPage;