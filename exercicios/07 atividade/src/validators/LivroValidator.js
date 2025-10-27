const yup = require('yup');

const createLivroSchema = yup.object({
  body: yup.object({
    titulo: yup.string().required('O título é obrigatório').trim(),
    autor: yup.string().required('O autor é obrigatório').trim(),
    editora: yup.string().required('A editora é obrigatória').trim(),
    ano: yup.number().required('O ano é obrigatório').typeError('O ano deve ser um número'),
    preco: yup
      .number()
      .required('O preço é obrigatório')
      .typeError('O preço deve ser um número')
      .positive('O preço deve ser um número positivo'),
  }),
});

const updateLivroSchema = yup.object({
  body: yup.object({
    titulo: yup.string().trim().notRequired(),
    autor: yup.string().trim().notRequired(),
    editora: yup.string().trim().notRequired(),
    ano: yup.number().typeError('O ano deve ser um número').notRequired(),
    preco: yup
      .number()
      .typeError('O preço deve ser um número')
      .positive('O preço deve ser um número positivo')
      .notRequired(),
  }),
});

const validateCreateLivro = async (req, res, next) => {
  try {
    await createLivroSchema.validate(
      { body: req.body },
      { abortEarly: false }
    );
    next();
  } catch (error) {
    return res.status(400).json({
      errors: error.errors,
    });
  }
};

const validateUpdateLivro = async (req, res, next) => {
  try {
    await updateLivroSchema.validate(
      { body: req.body },
      { abortEarly: false }
    );
    next();
  } catch (error) {
    return res.status(400).json({
      errors: error.errors,
    });
  }
};

module.exports = {
  validateCreateLivro,
  validateUpdateLivro,
};