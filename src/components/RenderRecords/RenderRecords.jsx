import React from "react";
import deleteImg from "./img/trash.png"
import updateImg from "./img/update.png"
import './RenderRecords.scss'

const RenderRecords = ({ newRecord }) => {

  console.log('newRecordnewRecord', newRecord);

  return (
    <div className="records">
      <div className="records__header">
        <div className="records__el-1">Имя:</div>
        <div className="records__el-2">Врач:</div>
        <div className="records__el-3">Дата:</div>
        <div className="records__el-4">Жалобы:</div>
        <div className="records__el-5"></div>
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