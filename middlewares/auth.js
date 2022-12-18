import jwt from 'jsonwebtoken';
// импортируем классы ошибок
import UnathorizedError from '../errors/UnathorizedError.js';
import CookieMissingError from '../errors/CookieMissingError.js';
import { errorMessagesAuth } from '../errors/ErrorMessages.js';

// получим секретный ключ
const { NODE_ENV, JWT_SECRET } = process.env;

// мидлвэр для авторизации
function auth(req, res, next) {
  // извлечем куки
  const { cookies } = req;
  // проверим наличие куки с токеном
  if (cookies && cookies.jwt) {
    // извлечем токен из куки
    const token = cookies.jwt;
    let payload;
    // верификация токена
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super_duper_crypto_strong_key');
    } catch (err) {
      // ушипка 401 - токен не прошел верификацию
      next(new UnathorizedError(errorMessagesAuth.unathorized));
    }
    // записываем пейлоуд в объект запроса
    req.user = payload;
    next();
  } else {
    // ушипка - куки с токеном нет (код 204 дабы избежать ненужных сообщений в консоле)
    // не удалось найти способа проверки наличия куки httpOnly с токеном на фронте из JS
    next(new CookieMissingError(errorMessagesAuth.cookie));
  }
}

export default auth;
