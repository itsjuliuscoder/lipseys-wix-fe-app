import axios from 'axios';

const BASE_URL = 'https://lipsey-wix-api-be.onrender.com';

const api = {
    signIn: async (credentials) => {
        const response = await axios.post(`${BASE_URL}/signin`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    getWixProducts: async () => {
        const response = await axios.get(`${BASE_URL}/wix/products`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    getWixCollections: async () => {
        const response = await axios.get(`${BASE_URL}/wix/collections`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    getLipseysCatalog: async () => {
        const response = await axios.get(`${BASE_URL}/lipseys/catalog`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },
};

export default api;
