import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeInfo: null
};

const options = {
    name: 'activeInfo',
    initialState,
    reducers: {
        setActiveInfo: (state, action) => {
            state.activeInfo = action.payload;
        },
        clearActiveInfo: (state) => {
            state.activeInfo = null;
        }
    }
}

const activeInfoSlice = createSlice(options);

export const { setActiveInfo, clearActiveInfo } = activeInfoSlice.actions;
export default activeInfoSlice.reducer;