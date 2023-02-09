import mongoose from 'mongoose';
// импортируем модуль для хэширования
import bcrypt from 'bcryptjs';
// импортируем классы ошибок
import UnathorizedError from '../errors/UnathorizedError.js';
// импортируем регулярное выражение
import { emailRegex } from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    // имя пользователя
    name: {
      type: String,
      minlength: [2, 'поле имя `{VALUE}` содержит менее 2 символов.'],
      maxlength: [30, 'поле имя `{VALUE}` содержит более 30 символов.'],
      required: [true, 'поле имя не заполнено.'],
    },
    // почта пользователя, используемая для регистрации
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (email) => emailRegex.test(email),
        message: 'поле email `{VALUE}` не прошло валидацию.',
      },
      required: [true, 'поле email не заполнено.'],
    },
    // хэш пароля
    password: {
      type: String,
      minlength: [6, 'поле пароль `{VALUE}` содержит менее 6 символов.'],
      required: [true, 'поле пароль не заполнено.'],
      select: false,
    },
  },
  // уберем лишний для нас ключ с версией документа
  { versionKey: false },
);

// метод схемы для поиска пользователя по логину и паролю
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      // проверим, найден ли пользователь
      if (user) {
        // вернем результат проверки корректности пароля
        return bcrypt.compare(password, user.password).then((checked) => {
          // если пароль корректный
          if (checked) {
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;
            return userWithoutPassword;
          } // если хэши не совпали отклоняем промис с ошибкой
          throw new UnathorizedError(
            'Указаны некорректные почта или пароль :-(',
          );
        });
      } // иначе отклоняем промис с ошибкой
      throw new UnathorizedError('Указаны некорректные почта или пароль :-(');
    });
};

// создадим и экспортируем модель user
export default mongoose.model('user', userSchema);
