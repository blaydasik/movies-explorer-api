export const errorMessagesUsersController = {
  notFound: 'Пользователь с указанным _id не найден.',
  badRequest: 'Переданы некорректные данные при запросе информации о пользователе.',
  badRequestCreate: 'Переданы некорректные данные при создании пользователя.',
  badRequestUpdate: 'Переданы некорректные данные при обновлении пользователя.',
  conflict: 'Нарушено условие на уникальность поля email :-(',
};

export const errorMessagesMoviesController = {
  notFound: 'Указанный фильм в базе не найден :-(',
  forbidden: 'Зафиксирована попытка удаления чужого фильма :-(',
  badRequest: 'Переданы некорректные данные для удаления фильма :-(',
  badRequestSave: 'Переданы некорректные данные при сохранении фильма :-(',
};

export const errorMessagesAuth = {
  unathorized: 'Переданный токен не верифицирован :-(',
  cookie: 'Отсутствует кука :-(',
};

export const errorMessagesRoutes = {
  notFound: 'Маршрута не найдена, насяльника :-(',
  unknown: 'На сервере произошла необработанная нами ушипка :-(',
  tooMany: 'Слишком много запросов с одного и того же ip-адреса :-(',
};
