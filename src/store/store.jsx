import { configureStore } from "@reduxjs/toolkit";

import activeInfoSlice from "./features/activeInfo/activeInfoSlice";
import shownInfoSlice from "./features/shownInfo/shownInfoSlice";

const store = configureStore({
    reducer: {
        mapInfo: activeInfoSlice,
        shownInfo: shownInfoSlice
    }
});

export default store;