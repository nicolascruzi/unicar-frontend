import React from "react";

export const handleCloseAlert = (event, reason, setOpenAlert) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenAlert(false);
};