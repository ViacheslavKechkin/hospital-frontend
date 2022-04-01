import React from "react";
import deleteImg from "./img/trash.png"
import updateImg from "./img/update.png"
import './RenderRecords.scss'

const RenderRecords = ({ newRecord }) => {
  const option = [
    {
      text: "Имя:"
    },
    {
      text: "Врач:"
    },
    {
      text: "Дата:"
    },
    {
      text: "Жалобы:"
    },
    {
      text: ""
    }
  ]

  return (
    <div className="records">
      <div className="records__header">
        {option.map((item, index) => {
          const { text } = item;
          return (
            <div key={`idx-${index}`} className={`records__el-${index + 1}`}>{text}</div>
          )
        })
        }
      </div>
      {
        newRecord.map((item, index) => {
          const { name, doctor, date, comment } = item;
          return (
            <div className={"wrapper-records"} key={`idx-${index}`}>
              <div className="records__name">{name}</div>
              <div className="records__doctor">{doctor}</div>
              <div className="records__date">{date}</div>
              <div className="records__comment">{comment}</div>
              <div className="records__function">
                <img className="records__img" src={deleteImg} alt="delete" />
                <img className="records__img" src={updateImg} alt="update" />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RenderRecords;