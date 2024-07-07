
// utils/signupUtils.js

export const checkPassword = (password, verifyPassword, setMessageAlert, setOpenErrorAlert) => {
    if (password === verifyPassword) {
      return true;
    }
    setMessageAlert("Las contraseñas no coinciden");
    setOpenErrorAlert(true);
    return false;
  };
  
  export const checkFields = (name, email, password, verifyPassword, university, gender, setMessageAlert, setOpenErrorAlert) => {
    if (name && email && password && verifyPassword && university && gender) {
      return true;
    }
    setMessageAlert("Por favor, complete todos los campos");
    setOpenErrorAlert(true);
    return false;
  };
  
  export const checkEmail = (email, setMessageAlert, setOpenErrorAlert) => {
    if (email.includes('@')) {
        return true;
      }
      setMessageAlert("Por favor, ingrese un email válido");
      setOpenErrorAlert(true);
      return false;
    };
  