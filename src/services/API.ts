import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_PLACEMENT == "Local" ? "https://localhost:5173/api" :"https://backend-4yko.onrender.com/api";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const upload = axios.create({
    baseURL: API_BASE_URL + '/upload',
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const youtube = axios.create({
    baseURL: API_BASE_URL + '/youtube',
    headers: {
        "Content-Type": "application/json"
    }
})
