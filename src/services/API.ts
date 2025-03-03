import axios from "axios";

const API_BASE_URL = "https://backend-4yko.onrender.com/api/";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const UPLOAD_BASE_URL = "https://backend-4yko.onrender.com/upload/";

export const upload = axios.create({
    baseURL: UPLOAD_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});