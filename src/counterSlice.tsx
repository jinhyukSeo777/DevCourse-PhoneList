import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IList } from "./App";

interface CounterState {
  showModal: boolean;
  list: IList[];
  groupList: string[];
}

const initialState: CounterState = {
  showModal: false,
  list: [],
  groupList: ["가족", "친구", "직장", "스터디"],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    setList: (state, action: PayloadAction<IList[]>) => {
      state.list = action.payload;
    },
    setGroupList: (state, action: PayloadAction<string[]>) => {
      state.groupList = action.payload;
    },
  },
});

export const { toggleModal, setList, setGroupList } = counterSlice.actions;

export default counterSlice.reducer;
