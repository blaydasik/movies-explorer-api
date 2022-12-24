// импортируем классы ошибок
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';
import BadRequestError from '../errors/BadRequestError.js';
import { errorMessagesMoviesController } from '../errors/ErrorMessages.js';
// импортируем схему карточки
import Movie from '../models/movie.js';

// обработчик запроса всех сохранённых текущим пользователем фильмов
export function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    // 500 - ушипка по умолчанию
    .catch((err) => next(err));
}

// обработчик запроса удаления сохранённого фильма по id
export function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      // проверим, нашёлся ли фильм в базе
      if (!movie) {
        // если фильм не нашелся в БД, то ушипка 404
        throw new NotFoundError(errorMessagesMoviesController.notFound);
        // проверим принадлежность сохраненного фильма текущему пользователю
      } else if (movie.owner.toString() !== req.user._id) {
        // если фильм не принадлежит пользователю, то ушипка 403
        throw new ForbiddenError(errorMessagesMoviesController.forbidden);
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((result) => {
            res.send(result);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // ушипка 400
        next(new BadRequestError(errorMessagesMoviesController.badRequest));
      } else {
        next(err);
      }
    });
}

// обработчик запроса создания фильма с переданными в теле:
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
export function createMovie(req, res, next) {
  const {
    country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        // ушипка 400
        next(new BadRequestError(errorMessagesMoviesController.badRequestSave));
      } else {
        // 500 - ушипка по умолчанию
        next(err);
      }
    });
}
