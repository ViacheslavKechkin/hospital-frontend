import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { styled } from '@mui/material/styles';

import {
  Button,
  Dialog,
  Typography,
  DialogContent,
  DialogActions
} from '@mui/material';
import './DeleteRecord.scss'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DeleteRecord = ({ idTask, setNewRecord, openDelete, closeDeleteWindow }) => {
  const navigate = useNavigate();

  const deleteFunction = async () => {
    await axios
      .delete(`http://localhost:9000/deleteOneRecord?_id=${idTask}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        closeDeleteWindow();
        setNewRecord(res.data.data);
      });
  };

  const validateForToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/registration')
    }
  }

  validateForToken();

  return (
    <>
      <BootstrapDialog className='delete-wrapper'
        onClose={closeDeleteWindow}
        aria-labelledby="customized-dialog-title"
        open={openDelete}
      >
        <Typography
          id="customized-dialog-title"
          onClose={closeDeleteWindow}
        >
          Удалить прием
        </Typography>
        <DialogContent dividers>
          <Typography
            className='delete-question'
            gutterBottom
          >
            Вы действительно хотите удалить прием?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => closeDeleteWindow()}>
            Отмена
          </Button>
          <Button
            autoFocus
            onClick={() => deleteFunction()}
          >
            Удалить
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

export default DeleteRecord;