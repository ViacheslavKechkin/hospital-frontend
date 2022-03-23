import React, { useContext } from 'react';
import { Snackbar } from '@mui/material';
import MyContext from '../../../context';

const Mysnackbar = ({ open, handleCloseBar }) => {

  const { messageSnackBar } = useContext(MyContext);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      onClose={handleCloseBar}
      message={messageSnackBar}
      sx={{ backgroundColor: 'red' }}
      transitionDuration={100}
    />
  )
}

export default Mysnackbar;