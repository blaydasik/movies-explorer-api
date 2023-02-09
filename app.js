import express from 'express';
import process from 'process';

// подключаем ODM
import mongoose from 'mongoose';
// импортируем cors
import cors from 'cors';
// импортируем парсеры данных
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// импортируем helmet для установки заголовков
import helmet from 'helmet';
// импортируем мидлвэр для обработки ошибок celebrate
import { errors } from 'celebrate';
// импортируем роутер
import router from './routes/index.js';
// импортируем миддлвару централизованнйо обработки ошибок
import proceedErrors from './middlewares/proceedErrors.js';
// импортируем миддлвару rate limiter
import rateLimiter from './middlewares/rateLimiter.js';
// импортируем логгеры
import { requestLogger, errorLogger } from './middlewares/logger.js';
// импортируем конфиг
import { databaseURL, serverPort, corseAllowedOrigins } from './utils/config.js';

process.on('unhandledRejection', (err) => {
  console.log(`Unexpected error: ${err}`);
  process.exit(1);
});

const app = express();
// используем cors
app.use(cors({
  origin: corseAllowedOrigins,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// задействуем нужные методы для парсеров данных
app.use(bodyParser.json());
app.use(cookieParser());

// включим валидацию для обновления документов
mongoose.set({ runValidators: true, autoIndex: true });
// подключимся к серверу MongoDB
mongoose.connect(databaseURL)
  .catch((err) => {
    console.log(`Connection to DB moviesdb has failed with error: ${err}`);
  });

// подключаем логгер запросов
app.use(requestLogger);

// подключим миддлвару для rate limiter
app.use(rateLimiter);

// подключим helmet
app.use(helmet());

// подключим роуты
app.use(router);

// подключаем логгер запросов
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// подключим мидлвэр для централизованной обработки ошибок
app.use(proceedErrors);

// запустим сервер на выбранном порту
app.listen(serverPort, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${serverPort}`);
});
