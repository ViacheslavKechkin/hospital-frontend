import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteRecord from "../MUI/DeleteRecord/DeleteRecord";
import DialogForEditingRecord from "../MUI/DialogForEditingRecord/DialogForEditingRecord";
import deleteImg from "./img/trash.png";
import updateImg from "./img/update.png";
import "./RenderRecords.scss";

const RenderRecords = ({ newRecord, doctors, setNewRecord }) => {
  const option = [
    {
      text: "Имя:",
    },
    {
      text: "Врач:",
    },
    {
      text: "Дата:",
    },
    {
      text: "Жалобы:",
    },
    {
      text: "",
    },
  ];
  const navigate = useNavigate();
  const [recordOnEditing, setRecordOnEditing] = useState(-1);

  const handleClickOpen = (index) => {
    setRecordOnEditing(index);
  };

  const handleClose = () => {
    setRecordOnEditing(-1);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [indexDeleteRecord, setIndexDeleteRecord] = useState(null);

  const openDeleteWindow = (index) => {
    validateForToken();
    setOpenDelete(true);
    setIndexDeleteRecord(index);
  };

  const closeDeleteWindow = () => {
    setOpenDelete(false);
    setIndexDeleteRecord(null);
  };

  const validateForToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/registration");
    }
  };

  validateForToken();

  return (
    <>
      <div className="records">
        <div className="records__header">
          {option.map((item, index) => {
            const { text } = item;
            return (
              <div key={`idx-${index}`} className={`records__el-${index + 1}`}>
                {text}
              </div>
            );
          })}
        </div>
        {newRecord.map((item, index) => {
          const { name, doctor, date, comment } = item;
          return (
            <div className="wrapper-records" key={`idx-${index}`}>
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
                  onClick={() => handleClickOpen(index)}
                />
              </div>
            </div>
          );
        })}
      </div>
      {recordOnEditing >= 0 && (
        <DialogForEditingRecord
          setNewRecord={setNewRecord}
          setOpen={setRecordOnEditing}
          doctors={doctors}
          handleClose={handleClose}
          recordOnEditing={newRecord[recordOnEditing]}
        />
      )}
      {openDelete && (
        <DeleteRecord
          idTask={newRecord[indexDeleteRecord]._id}
          setNewRecord={setNewRecord}
          openDelete={openDelete}
          closeDeleteWindow={closeDeleteWindow}
        />
      )}
    </>
  );
};

export default RenderRecords;
