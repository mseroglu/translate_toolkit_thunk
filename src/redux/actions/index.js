import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";


export const getLanguages = createAsyncThunk("language/getLanguages", async () => {
    const resp = await api.get("/getLanguages")

    return resp.data.data.languages
})

export const translateText = createAsyncThunk("translate/translateText",
    async ({ sourceLang, targetLang, text }) => {
        const params = new URLSearchParams()
        params.set("source_language", sourceLang.value)
        params.set("target_language", targetLang.value)
        params.set("text", text)

        const headers = {
            "content-type":"application/x-www-form-urlencoded"
        }

        const resp = await api.post("/translate", params, { headers })
        
        // aksiyonun payloadı return edilir.
        return resp.data.data.translatedText
    })