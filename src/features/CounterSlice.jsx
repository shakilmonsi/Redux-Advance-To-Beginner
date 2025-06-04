import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  users: [{ name: "Shakil Mosni" }],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    addUser: (state, action) => {
      state.users.push({ name: action.payload });
    },
  },
});

export const { increment, decrement, addUser } = counterSlice.actions;
export default counterSlice.reducer;
