import React, { useContext } from 'react';
import { Snackbar } from '@mui/material';
import MyContext from '../../../context';
import './Mysnackbar.scss'

const Mysnackbar = ({ open, handleCloseBar }) => {

  const { messageSnackBar } = useContext(MyContext);

  return (
    <Snackbar className='mySnackbar'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={handleCloseBar}
      message={messageSnackBar}
      transitionDuration={100}
    />
  )
}

export default Mysnackbar;