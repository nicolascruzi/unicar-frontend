import React, { useState } from 'react';
import { Snackbar, Alert } from "@mui/material";

function AlertBox({ severity, messageAlert, setOpenAlert, openAlert, hideDuration }) {

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Snackbar open={openAlert} autoHideDuration={hideDuration} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity={severity} sx={{ width: '100%' }}>
            {messageAlert}
        </Alert>
    </Snackbar>
  );
}

export default AlertBox;