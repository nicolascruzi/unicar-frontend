import React, { useState } from 'react';
import { Snackbar, Alert } from "@mui/material";
import { handleCloseAlert } from '../utils/handleCloseAlert';

function AlertBox({ severity, messageAlert, setOpenAlert, openAlert, hideDuration }) {

  return (
    <Snackbar open={openAlert} autoHideDuration={hideDuration} onClose={(event, reason) => handleCloseAlert(event, reason, setOpenAlert)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity={severity} sx={{ width: '100%' }}>
            {messageAlert}
        </Alert>
    </Snackbar>
  );
}

export default AlertBox;