import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeInfo: null,
    shownInfo: false
};

const options = {
    name: 'activeInfo',
    initialState,
    reducers: {
        setActiveInfo: (state, action) => {
            state.activeInfo = action.payload;
        },
        setShownInfo: (state, action) => {
            state.shownInfo = action.payload;
        }
    }
}

const activeInfoSlice = createSlice(options);

export const { setActiveInfo, setShownInfo } = activeInfoSlice.actions;
export default activeInfoSlice.reducer;