import { configureStore } from "@reduxjs/toolkit";

import activeInfoSlice from "./features/activeInfo/activeInfoSlice";

const store = configureStore({
    reducer: {
        mapInfo: activeInfoSlice,
    }
});

export default store;