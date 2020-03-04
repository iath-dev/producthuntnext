import React from 'react';

/**
 * Hook que permite la validación de un formulario.
 * @param {{}} initial Valor inicial del objeto
 * @param {() => any} validate Función de validación
 * @param {() => any} func Función a realizar tras el submit
 */
const useValidation = (initial, validate, func) => {
  const [values, setValues] = React.useState(initial);
  const [errors, setErrors] = React.useState({});
  const [submitForm, setSubmitFom] = React.useState(false);

  React.useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;

      if (noErrors) {
        func(values);
      }

      setSubmitFom(false);
    }
  }, [errors]);

  /**
   * Función para realizar los cambios en el contenido.
   * @param {event} event Cambios es el contenido
   */
  const handleChanges = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  /**
   * Función para manejar el submit;
   * @param {event} event Evento del HTML
   */
  const handleSubmit = event => {
    event.preventDefault();
    const errorValidate = validate(values);
    setErrors(errorValidate);
    setSubmitFom(true);
  };

  const handleBlur = () => {
    const errorValidate = validate(values);
    setErrors(errorValidate);
  };

  return {
    values,
    errors,
    submitForm,
    handleChanges,
    handleSubmit,
    handleBlur,
  };
};

export default useValidation;
