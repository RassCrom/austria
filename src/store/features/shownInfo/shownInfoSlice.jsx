import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shownInfo: false
};

const options = {
    name: 'shownInfo',
    initialState,
    reducers: {
        setShownInfo: (state) => {
            state.shownInfo = !state.shownInfo;
        }
    }
}

const shownInfoSlice = createSlice(options);

export const { setShownInfo } = shownInfoSlice.actions;
export default shownInfoSlice.reducer;