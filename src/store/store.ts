// сконфигурирем наш store

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';

export const store = configureStore({
  // будем подключать все наши доступные reducer
  // reduce - это некая функция, которую мы будем диспатчить для изменения нашего состояния
  // внутри reduce будут подключены различные slice
  // поэтому reduce называют централизованным хранилищем, так как у нас есть некий store,
  // к которому подключаются все необходмые slice
  reducer: {
    user: userSlice, // подключим редюсер userSlice
  },
});

// также нам дополнительно потребуется типизация, чтобы правильно вывести store

export type RootState = ReturnType<typeof store.getState>; // нам нужно то, что это состояние возвращает
// поэтому нам нужен утилитарный тип

// тип того, что мы можем диспатчить
export type AppDispath = typeof store.dispatch;

// создадим редюсер, который обепечит состояние внутри нашего редакса, например,  токена
// slice - кусочек нашего store, т.е. редюсеры, которые его изменяют
