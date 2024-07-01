import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "../actions";


const languageSlice = createSlice({
    name: "language",
    initialState: {
        isLoading: false,
        isError: false,
        languages: []
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(getLanguages.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getLanguages.rejected, (state) => {
            state.isError = true
            state.isLoading = false
        })
        builder.addCase(getLanguages.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.isError = false
            state.languages = payload
        })
    }
})

export default languageSlice.reducer

