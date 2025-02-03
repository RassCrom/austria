import { configureStore } from "@reduxjs/toolkit";

import activeInfoSlice from "./features/activeInfo/activeInfoSlice";
import currentTopicSlice from "./features/currentTopic/currentTopic";

const store = configureStore({
    reducer: {
        mapInfo: activeInfoSlice,
        currentTopic: currentTopicSlice
    }
});

export default store;