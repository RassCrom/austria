import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    activeInfo: null,
    shownInfo: false,
    shownGeojson: false
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
        },
        setShownGeojson: (state) => {
            state.shownGeojson = !state.shownGeojson;
        }
    }
}

const activeInfoSlice = createSlice(options);

export const { setActiveInfo, setShownInfo, setShownGeojson } = activeInfoSlice.actions;
export default activeInfoSlice.reducer;