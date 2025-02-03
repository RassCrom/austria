import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topic: null,
}

const options = {
    name: 'currentTopic',
    initialState,
    reducers: {
        setCurrentTopic(state, action) {
            state.topic = action.payload
        }
    }
}

const currentTopicSlice = createSlice(options)

export const { setCurrentTopic } = currentTopicSlice.actions;
export default currentTopicSlice.reducer;