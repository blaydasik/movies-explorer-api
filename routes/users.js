import { Router } from 'express';

// импортируем обработчики запросов для роутов
import {
  getCurrenUser, updateProfile,
} from '../controllers/users.js';

// импортируем валидаторы celebrate
import {
  celebrateupdateProfile,
} from '../validators/users.js';

// настроим маршруты для users
const usersRouter = Router();

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', getCurrenUser);

// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', celebrateupdateProfile, updateProfile);

// экспортируем роутер
export default usersRouter;
