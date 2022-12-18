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
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().min(4).max(4).required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlRegex).uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().regex(urlRegex).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().regex(urlRegex).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
