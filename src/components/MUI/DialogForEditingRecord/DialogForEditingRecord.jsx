import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button,
  Dialog,
  TextField,
  Typography,
  Autocomplete,
  DialogContent,
  DialogActions
} from '@mui/material';
import './DialogForEditingRecord.scss'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DialogForEditingRecord = ({
  doctors,
  handleClose,
  recordOnEditing,
  setNewRecord }) => {

  const navigate = useNavigate();

  const { _id, name, doctor, date, comment } = recordOnEditing;

  const converDate = (normalDate) => {
    normalDate = normalDate.split(".");
    [normalDate[0], normalDate[1]] = [normalDate[1], normalDate[0]];
    return normalDate.join('-')
  }

  const [data, setData] = useState({
    newNameRecord: name,
    newDoctorRecord: doctor,
    newDateRecord: converDate(date),
    newCommentRecord: comment,
  });

  const {
    newNameRecord,
    newDoctorRecord,
    newDateRecord,
    newCommentRecord,
  } = data;

  const handleChangeData = (inputName, value) => {
    setData({
      ...data,
      [inputName]: value,
    });
  };

  const saveUpdateRecord = async () => {

    data.newDateRecord = moment(data.newDateRecord).format(
      "DD.MM.YYYY"
    );

    await axios
      .patch(
        "http://localhost:9000/editOneRecord",
        {
          _id,
          name: newNameRecord,
          doctor: newDoctorRecord,
          date: data.newDateRecord,
          comment: newCommentRecord,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        handleClose();
        setNewRecord([...res.data.data]);
      });
  };

  const validateToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/registration')
    }
  };

  validateToken();

  return (
    <div>
      <BootstrapDialog className='dialog-wrapper'
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <Typography
          id="customized-dialog-title"
          onClose={handleClose}
          gutterBottom>
          Изменить прием
        </Typography>
        <DialogContent dividers>
          <Typography
            className='Typography-name'
            gutterBottom>
            Имя:
          </Typography>
          <TextField
            name="newNameRecord"
            value={newNameRecord || ""}
            onChange={(e) =>
              handleChangeData(e.target.name, e.target.value)
            }
            id="outlined-basic"
          />
          <Typography gutterBottom>
            Врач:
          </Typography>
          <Autocomplete
            id="combo-box-demo"
            value={newDoctorRecord}
            onChange={(event, value) =>
              handleChangeData('newDoctorRecord', value.label)
            }
            disablePortal
            options={doctors}
            renderInput={(params) => <TextField name="newDoctorRecord" {...params} />}
          />
          <Typography gutterBottom>
            Дата:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat={"dd/MM/yyyy"}
              name="newDateRecord"
              value={newDateRecord}
              onChange={(e) => handleChangeData("newDateRecord", e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Typography gutterBottom>
            Жалоба:
          </Typography>
          <TextField
            name="newCommentRecord"
            id="outlined-multiline-flexible"
            value={newCommentRecord || ""}
            onChange={(e) =>
              handleChangeData(e.target.name, e.target.value)
            }
            multiline
            minRows={4}
            maxRows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleClose()}>
            Отмена
          </Button>
          <Button
            autoFocus
            onClick={() => saveUpdateRecord()}>
            Сохранить
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default DialogForEditingRecord;