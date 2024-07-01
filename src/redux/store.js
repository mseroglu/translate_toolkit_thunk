import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/langSlice";
import translateSlice from "./slices/translateSlice";


export default configureStore({
    reducer: {
        languageSlice,
        translateSlice,
    }    
})