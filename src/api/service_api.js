import axios from 'axios';
import {API_BASE_URL} from "../components/constants";

export const commonServiceAPI = axios.create({
    baseURL: API_BASE_URL
})


