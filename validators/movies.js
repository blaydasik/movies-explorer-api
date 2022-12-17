import { celebrate, Joi } from 'celebrate';
import urlRegex from '../utils/constants.js';

// валидатор id фильма при удалении
export const celebrateMovieId = celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

// валидатор полей при создании карточки
export const celebrateCreateMovie = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(urlRegex).uri({ scheme: ['http', 'https'] }).required(),
  }),
});
