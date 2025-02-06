import axios from 'axios';

const BASE_URL = 'https://lipsey-wix-api-be-v1.onrender.com/api' //'http://localhost:5001/api'; //'https://exchange-app-be.onrender.com/api';   //'http://localhost:5001/api';

const userId = '6779855f4c7aebc2509ebc79';

const api = {
    signIn: async (credentials) => {
        const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    getWixProducts: async () => {
        const response = await axios.get(`${BASE_URL}/inventory/wix-products`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    getWixCollections: async () => {
        const response = await axios.get(`${BASE_URL}/inventory/wix-collections`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    getLipseysCatalog: async () => {
        const response = await axios.get(`${BASE_URL}/inventory/lipsey-catalog`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },

    getSyncedProducts: async () => {
        const response = await axios.get(`${BASE_URL}/sync/get-synced-products`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
};

export default api;
