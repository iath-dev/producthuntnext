export default function ValidateLogin(values) {
  const errors = {};

  const { email, password } = values;

  if (!email) {
    errors.email = 'El Email es Obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = 'Email no valido';
  }

  if (!password) {
    errors.password = 'El password es obligatorio';
  } else if (password.length < 6) {
    errors.password = 'La contraseña debe tener minimo 6 caracteres';
  }

  return errors;
}
