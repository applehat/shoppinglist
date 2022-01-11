import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:3008`,
    headers: {
        'Accept': 'application/json',
    }
});

export default axiosClient;