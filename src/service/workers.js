// services/workers.js
import axios from "axios";

const baseURL = "https://store.go-clothes.uz/v1";

const workers = {
    get: async (params) => {
        const response = await axios.get(`${baseURL}/workers`, { params });
        return response.data;
    },
    delete: async (id) => {
        const response = await axios.delete(`${baseURL}/workers/${id}`);
        return response;
    },
    update: async (id, payload) => {
        const response = await axios.put(`${baseURL}/workers/${id}`, payload);
        return response;
    },
};

export default workers;
