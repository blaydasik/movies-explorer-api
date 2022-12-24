import express from 'express';

// импортируем роутеры
import usersRouter from './users.js';
import moviesRouter from './movies.js';
// импортируем обработчики запросов для роутов
import { login, createUser, deleteCredentials } from '../controllers/users.js';
// импортируем мидлвару авторизации
import auth from '../middlewares/auth.js';
// импортируем валидаторы celebrate
import { celebrateLoginUser, celebrateCreateUser } from '../validators/users.js';
import NotFoundError from '../errors/NotFoundError.js';
import { errorMessagesRoutes } from '../errors/ErrorMessages.js';

const router = express();

// настроим роуты
router.post('/signin', celebrateLoginUser, login);
router.post('/signup', celebrateCreateUser, createUser);

// защитим все остальные роуты авторизацией
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// дополнительный роут для удаления JWT из куки
router.post('/signout', deleteCredentials);

// для любых других роутов
router.all('*', (req, res, next) => {
  // 404 - был запрошен несушествующий роут
  next(new NotFoundError(errorMessagesRoutes.notFound));
});

export default router;
