function createAlert(error) {
  const alert = new Alert("", "", "danger", true, error.code);
  switch (error.code) {
    case 11000:
      alert.title = "Error";
      alert.message = "El nombre de usuario ya está registrado";
      break;
    case 11600:
      alert.title = "Error";
      alert.message = "Indice duplicado";
      break;
    case 12500:
      alert.title = "Error";
      alert.message = "Consulta inválida";
      break;
    case 13111:
      alert.title = "Error";
      alert.message = "Error de actualización, revise los datos";
      break;
    case 16460:
      alert.title = "Error";
      alert.message = "Error de conexión con la base de datos";
      break;
    case 16755:
      alert.title = "Error";
      alert.message = "Error de autenticación";
      break;
    case 16996:
      alert.title = "Error";
      alert.message = "No tiene permisos para realizar esta acción";
      break;
    case 17280:
      alert.title = "Error";
      alert.message = "Error de tiempo de espera";
      break;
    default:
      alert.title = "Error desconocido: " + error.code;
      alert.message = "" + error.message;
      break;
  }
  return alert;
}

export default createAlert;
