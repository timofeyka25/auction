import {createSlice} from "@reduxjs/toolkit";

export const pageSlice = createSlice({
    name: "page",
    initialState: {
        page: null,
    },
    reducers: {
        load: (state, action) =>{
            state.page = action.payload;
        },
        reset: (state) => {
            state.page = null;
        },
    },
});

export const {load, reset} = pageSlice.actions;

export const selectPage = (state) => state.page.page;

export default pageSlice.reducer;
