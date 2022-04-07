import React, { useState } from "react";
import DeleteRecord from "../MUI/DeleteRecord/DeleteRecord";
import DialogForEditingRecord from "../MUI/DialogForEditingRecord/DialogForEditingRecord";
import deleteImg from "./img/trash.png"
import updateImg from "./img/update.png"
import './RenderRecords.scss'

const RenderRecords = ({ newRecord, doctors, setNewRecord }) => {
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

  const [open, setOpen] = useState(false);

  const [recordOnEditing, setRecordOnEditing] = useState(null);

  const handleClickOpen = (item) => {
    setRecordOnEditing(item)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRecordOnEditing('')
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [indexDeleteRecord, setIndexDeleteRecord] = useState(null);

  const openDeleteWindow = (index) => {
    setOpenDelete(true);
    setIndexDeleteRecord(index);
  };

  const closeDeleteWindow = () => {
    setOpenDelete(false);
    setIndexDeleteRecord(null);
  };

  return (
    <>
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
                  <img
                    className="records__img"
                    src={deleteImg}
                    alt="delete"
                    onClick={() => openDeleteWindow(index)}
                  />
                  <img
                    className="records__img"
                    src={updateImg}
                    alt="update"
                    onClick={() => handleClickOpen(item)}
                  />
                </div>
              </div>
            )
          })
        }
      </div>
      {recordOnEditing && (
        <DialogForEditingRecord
          setNewRecord={setNewRecord}
          setOpen={setOpen}
          doctors={doctors}
          open={open}
          handleClose={handleClose}
          recordOnEditing={recordOnEditing}
        />
      )
      }
      {openDelete && (
        <DeleteRecord
          idTask={newRecord[indexDeleteRecord]._id}
          setNewRecord={setNewRecord}
          openDelete={openDelete}
          closeDeleteWindow={closeDeleteWindow}
        />
      )
      }
    </>
  )
}

export default RenderRecords;