import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface activeCarState {
  carId?: number;
}

const initialState: activeCarState = {
  carId: undefined,
};

export const activeCarSlice = createSlice({
  name: 'activeCar',
  initialState,
  reducers: {
    setActiveCarId: (state: activeCarState, action: PayloadAction<number | undefined>) => {
      state.carId = action.payload;
      console.log(action.payload, state.carId);
    },
  },
});

export const { setActiveCarId } = activeCarSlice.actions;

export default activeCarSlice.reducer;

