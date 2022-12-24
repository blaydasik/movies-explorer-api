import { celebrate, Joi } from 'celebrate';

// валидатор полей email и пароль при логине
export const celebrateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// валидатор полей при создании пользователя
export const celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

// валидатор полей при обновлении данных пользователя
export const celebrateupdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});
