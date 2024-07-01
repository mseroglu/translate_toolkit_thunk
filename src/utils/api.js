import axios from "axios";


const api = axios.create({
    baseURL: "https://text-translator2.p.rapidapi.com",
    headers: {
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        "x-rapidapi-key": import.meta.env.VITE_API_KEY
    }
})

export default api