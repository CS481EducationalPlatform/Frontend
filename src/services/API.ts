import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8001/api/";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const UPLOAD_BASE_URL = "http://127.0.0.1:8001/upload/";

export const upload = axios.create({
    baseURL: UPLOAD_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});