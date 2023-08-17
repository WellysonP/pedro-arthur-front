import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL_API
const api = axios.create({
    baseURL: baseUrl
})

export default api