import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  jwt: string | null;
}
const initialState: UserState = {
  jwt: null, // изначально jwt будет пустым
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // мы можем создавать неограниченное число редюсеров, которые работает с состояним initialState и как-то его меняют

  reducers: {
    // наборы функций, которые должны менять наше состояние
    addJwt: (state) => {
      state.jwt = 'asdsad';
    },
    logout: (state) => {
      state.jwt = null;
    },
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
