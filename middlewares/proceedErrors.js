// импортируем константы ошибок
import { constants } from 'http2';
import { errorMessagesRoutes } from '../errors/ErrorMessages.js';

// мидлвэр для централизованной обработки ошибок
function proceedErrors(err, req, res, next) {
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    message = errorMessagesRoutes.unknown;
  }
  // если ошибка сгенерирована не нами
  res.status(statusCode).send({ message });
  next();
}

export default proceedErrors;
