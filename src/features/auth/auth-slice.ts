import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  token: string | null;
}

const initialState: State = {
  token: window.localStorage.getItem("__auth_token__"),
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      // it's ok to do because immer makes it
      // immutable under the hood
      state.token = action.payload;
    },
  },
});

export const { setToken } = authReducer.actions;

export default authReducer.reducer;
