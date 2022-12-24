import dotenv from 'dotenv';

// установим порт для запуска сервера
export const serverPort = process.env.PORT || 3001;

// длина модификатора входа хэш-функции
export const saltLength = 10;

// добавим env-переменные из файла в process.env
dotenv.config();
// получим секретный ключ
const { NODE_ENV, JWT_SECRET, DB_URL } = process.env;
export const secretKey = NODE_ENV === 'production' ? JWT_SECRET : 'super_duper_crypto_strong_key';

// настройки содениения с БД
export const databaseURL = NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb';

// список разрешенных адресов
export const corseAllowedOrigins = [
  'http://diplomabyblaydasik.nomoredomains.club',
  'https://diplomabyblaydasik.nomoredomains.club',
];
