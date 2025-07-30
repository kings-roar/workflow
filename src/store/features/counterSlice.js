import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setIncrementCounter: (state) => {
            state.value += 1;
        },
        setDerementCounter: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setIncrementCounter, setDerementCounter } = counterSlice.actions;
export const counterSelector = (state) => state.counter;
export default counterSlice.reducer;
