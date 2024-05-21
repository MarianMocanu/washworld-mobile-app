import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface EventState {
  carId?: number;
  serviceId?: number;
  terminalId?: number;
}

const initialState: EventState = {
  carId: undefined,
  serviceId: undefined,
  terminalId: undefined,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setCarId: (state: EventState, action: PayloadAction<number | undefined>) => {
      state.carId = action.payload;
    },
    setServiceId: (state: EventState, action: PayloadAction<number | undefined>) => {
      state.serviceId = action.payload;
    },
    setTerminalId: (state: EventState, action: PayloadAction<number | undefined>) => {
      state.terminalId = action.payload;
    },
    resetEvent: (state: EventState) => {
      state.carId = undefined;
      state.serviceId = undefined;
      state.terminalId = undefined;
    },
  },
});

export const { setCarId, setServiceId, setTerminalId, resetEvent } = eventSlice.actions;

export default eventSlice.reducer;
