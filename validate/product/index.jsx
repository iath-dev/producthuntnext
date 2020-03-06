export default function ValidateProduct(values) {
  const errors = {};

  const { name, company, url, description, img } = values;

  if (!name) {
    errors.name = 'El nombre es obligatorio';
  }

  if (!company) {
    errors.company = 'La compañía es obligatorio';
  }

  if (!description) {
    errors.description = 'La descripción es obligatorio';
  }

  if (!url) {
    errors.url = 'El URL del producto es obligatorio';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
    errors.url = 'El URL debe ser valido';
  }

  return errors;
}
