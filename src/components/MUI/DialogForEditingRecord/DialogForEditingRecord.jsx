import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import PropTypes from 'prop-types';
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
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

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DialogForEditingRecord = ({
  doctors,
  open,
  handleClose,
  recordOnEditing,
  setOpen,
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
    newDateRecord: date,
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
    setOpen(false);

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
        setOpen(false);
        setNewRecord(res.data.data);
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
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Изменить прием
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
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
            name="newDoctorRecord"
            id="combo-box-demo"
            value={newDoctorRecord || ""}
            onChange={(e) =>
              handleChangeData(e.target.name, e.target.value)
            }
            disablePortal
            options={doctors}
            renderInput={(params) => <TextField {...params} />}
          />
          <Typography gutterBottom>
            Дата:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
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