import { Router } from 'express';

// импортируем обработчики запросов для роутов
import {
  getMovies, createMovie, deleteMovie,
} from '../controllers/movies.js';

// импортируем валидаторы
import {
  celebrateCreateMovie, celebrateMovieId,
} from '../validators/movies.js';

// настроим маршруты для movies
const moviesRouter = Router();

// возвращает все сохранённые текущим  пользователем фильмы
moviesRouter.get('/', getMovies);

// создаёт фильм с переданными в теле:
// country, director, duration, year, description,
// image, trailerLink, nameRU, nameEN, thumbnail, movieId
moviesRouter.post('/', celebrateCreateMovie, createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/:movieId', celebrateMovieId, deleteMovie);

// экспортируем роутер
export default moviesRouter;
