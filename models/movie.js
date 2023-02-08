import mongoose from 'mongoose';
// импортируем регулярку
import { urlRegex } from '../utils/constants.js';

const movieSchema = new mongoose.Schema(
  {
    // страна создания фильма
    country: {
      type: String,
      required: [true, 'поле страна создания фильма не заполнено'],
    },
    // режиссёр фильма
    director: {
      type: String,
      required: [true, 'поле режиссёр фильма не заполнено'],
    },
    // длительность фильма
    duration: {
      type: Number,
      required: [true, 'поле длительность фильма не заполнено'],
    },
    // год выпуска фильма
    year: {
      type: String,
      required: [true, 'поле год выпуска фильма не заполнено'],
      minlength: [4, 'поле год выпуска фильма [{VALUE}] содержит менее 4 символов'],
      maxlength: [4, 'поле год выпуска фильма [{VALUE}] содержит более 4 символов'],
    },
    // описание фильма
    description: {
      type: String,
      required: [true, 'поле описание фильма не заполнено'],
    },
    // ссылка на постер к фильму
    image: {
      type: String,
      required: [true, 'поле ссылка на постер к фильму не заполнено'],
      validate: {
        validator: (url) => urlRegex.test(url),
        message: 'поле ссылка на постер к фильму `{VALUE}` не прошло валидацию.',
      },
    },
    // ссылка на птрейлер фильма
    trailerLink: {
      type: String,
      required: [true, 'поле ссылка на трейлер фильма не заполнено'],
      validate: {
        validator: (url) => urlRegex.test(url),
        message: 'поле ссылка на трейлер фильма `{VALUE}` не прошло валидацию.',
      },
    },
    // миниатюрное изображение постера к фильму
    thumbnail: {
      type: String,
      required: [true, 'поле миниатюрное изображение постера к фильму не заполнено'],
      validate: {
        validator: (url) => urlRegex.test(url),
        message: 'поле миниатюрное изображение постера к фильму `{VALUE}` не прошло валидацию.',
      },
    },
    // _id пользователя, который сохранил фильм
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    // id фильма, который содержится в ответе сервиса MoviesExplorer
    movieId: {
      type: Number,
      required: true,
    },
    // название фильма на русском языке
    nameRU: {
      type: String,
      required: [true, 'поле название фильма на русском языке не заполнено'],
    },
    // название фильма на английском языке
    nameEN: {
      type: String,
      required: [true, 'поле название фильма на английском языке не заполнено'],
    },
  },
  // уберем лишний для нас ключ с версией документа
  { versionKey: false },
);

// создадим и экспортируем модель movie
export default mongoose.model('movie', movieSchema);
