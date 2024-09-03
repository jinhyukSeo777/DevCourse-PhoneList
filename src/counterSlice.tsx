import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  showModal: boolean;
}

const initialState: CounterState = {
  showModal: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const { toggleModal } = counterSlice.actions;

export default counterSlice.reducer;
