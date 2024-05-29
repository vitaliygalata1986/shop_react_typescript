import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios from 'axios';
import { PREFIX } from '../api/api';
import { LoginResponse } from '../interfaces/auth.interface';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
}
const initialState: UserState = {
  // jwt: null, // изначально jwt будет пустым
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  'user/login', // асинхронный переходник, первый параметр - название переходника: user/login, второй - асинхронная функция, которую он оборачивает
  async (params: { email: string; password: string }) => {
    const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
      // здесь не нужно делать JSON.stringify
      email: params.email,
      password: params.password,
    });
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // мы можем создавать неограниченное число редюсеров, которые работает с состояним initialState и как-то его меняют

  reducers: {
    // наборы функций, которые должны менять наше состояние
    // addJwt: (state, action: PayloadAction<string>) => {
    //   state.jwt = action.payload;
    // },
    logout: (state) => {
      state.jwt = null;
    },
  },
  extraReducers: (builder) => {
    // позволяет добавить кейсы из результатов каждой асинхронной операции
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.jwt = action.payload.access_token;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
