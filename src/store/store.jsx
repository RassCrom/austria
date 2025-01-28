import { configureStore } from "@reduxjs/toolkit";

import soundReducer from './features/sound/soundSlice';

const store = configureStore({
    reducer: {
        sound: soundReducer,

    }
});

export default store;