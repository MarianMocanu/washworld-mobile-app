import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface EventState {
  carId?: number;
  serviceId?: number;
  terminalId?: number;
  locationId?: number;
}

const initialState: EventState = {
  carId: undefined,
  serviceId: undefined,
  terminalId: undefined,
  locationId: undefined,
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
    setLocationId: (state: EventState, action: PayloadAction<number | undefined>) => {
      state.locationId = action.payload;
    },
    resetEvent: (state: EventState) => {
      state.carId = undefined;
      state.serviceId = undefined;
      state.terminalId = undefined;
      state.locationId = undefined;
    },
  },
});

export const { setCarId, setServiceId, setTerminalId, setLocationId, resetEvent } = eventSlice.actions;

export default eventSlice.reducer;
