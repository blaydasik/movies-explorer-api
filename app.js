import express from 'express';
import process from 'process';

// подключаем ODM
import mongoose from 'mongoose';
// импортируем cors
import cors from 'cors';
// импортируем парсеры данных
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// импортируем мидлвэр для обработки ошибок celebrate
import { errors } from 'celebrate';
// импортируем роутер
import router from './routes/index.js';
// импортируем миддлвару централизованнйо обработки ошибок
import proceedErrors from './middlewares/proceedErrors.js';

// импортируем логгеры
import { requestLogger, errorLogger } from './middlewares/logger.js';

// установим порт для запуска сервера, получим секретный ключ
const { PORT = 3000 } = process.env;
// список разрешенных адресов
const corseAllowedOrigins = [
  'http://mestobyblaydasik.nomoredomains.club',
  'https://mestobyblaydasik.nomoredomains.club',
];

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
mongoose.set({ runValidators: true });
// подключимся к серверу MongoDB
mongoose.connect('mongodb://localhost:27017/moviesdb')
  .catch((err) => {
    console.log(`Connection to DB moviesdb has failed with error: ${err}`);
  });

// подключаем логгер запросов
app.use(requestLogger);

// подключим роуты
app.use(router);

// подключаем логгер запросов
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// подключим мидлвэр для централизованной обработки ошибок
app.use(proceedErrors);


// запустим сервер на выбранном порту
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
