import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; //'https://exchange-app-be.onrender.com/api';   //'http://localhost:5001/api';

const userId = '6779855f4c7aebc2509ebc79';

const apiService = {
    createSignal: async (signalData) => {
        signalData.userId = userId;
        try {
            const response = await axios.post(`${API_BASE_URL}/signal/create`, signalData);
            return response.data;
        } catch (error) {
            console.error('Error creating signal:', error);
            throw error;
        }
    },

    getAllSignals: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/signal/list`);
            return response.data;
        } catch (error) {
            console.error('Error getting all signals:', error);
            throw error;
        }
    },

    getWalletDetails: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/wallet/get-wallet/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting wallet details:', error);
            throw error;
        }
    },

    getUserDetails: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/users/`, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting user details:', error);
            throw error;    
        }
    },

    getCryptoData: async (cryptoId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/trading/crypto/all-markets`, {
                params: { cryptoId }
            });
            return response.data;
        } catch (error) {
            console.error('Error getting crypto data:', error);
            throw error;
        }
    },

    createTrade: async (tradeData) => {
        tradeData.userId = userId;
        try {
            const response = await axios.post(`${API_BASE_URL}/trading/create`, tradeData);
            return response.data;
        } catch (error) {
            console.error('Error creating trade:', error);
            throw error;
        }
    },

    getAllTrade: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/trading/list`);
            return response.data;
        } catch (error) {
            console.error('Error getting all trades:', error);
            throw error;
        }
    },

    getAllUsers: async () => {

        try {
            const response = await axios.get(`${API_BASE_URL}/admin/users`);
            return response.data;
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }

    },

    getTotalTransactions: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/get-total-transaction`);
            return response.data;
        } catch (error) {
            console.error('Error getting total transactions:', error);
            throw error;
        }
    },

    getWithdrawalTransactions: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/get-total-widthrawal-trans`);
            return response.data;
        } catch (error) {
            console.error('Error getting total withdrawal transaction transactions:', error);
            throw error;
        }
    },

    getDepositTransactions: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/get-total-deposit-trans`);
            return response.data;
        } catch (error) {
            console.error('Error getting total deposit transactions:', error);
            throw error;
        }
    },

    getRequestedWithdrawalTransactions: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/get-pending-withdrawal`);
            return response.data;
        } catch (error) {
            console.error('Error getting requested withdrawal transactions:', error);
            throw error;
        }
    },

    createTransaction: async (formData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/transactions/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }

    },

    approveTransaction: async (payload) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/transactions/approve-deposit`, payload);
            return response.data;
        } catch (error) {
            console.error('Error approving transaction:', error);
            throw error;
        }
    },

    declineTransaction: async (payload) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/transactions/decline-deposit`, payload);
            return response.data;
        } catch (error) {
            console.error('Error approving transaction:', error);
            throw error;
        }
    },

    requestWidthdrawal: async (payload) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/transactions/withdrawal`, payload);
            return response.data;
        } catch (error) {
            console.error('Error requesting withdrawal:', error);
            throw error;
        }

    },

    approveWithdrawal: async (payload) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/transactions/approve-withdrawal`, payload);
            return response.data;
        } catch (error) {
            console.error('Error approving withdrawal:', error);
            throw error;
        }
    },

    declineWithdrawal: async (payload) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/transactions/decline-withdrawal`, payload);
            return response.data;
        } catch (error) {
            console.error('Error declining withdrawal:', error);
            throw error;
        }
    },

    blockUser: async (userId) => {
        try {
            const response = await axios.axios.put(`${API_BASE_URL}/admin/block-user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error blocking user:', error);
            throw error;
        }
    },

    updateWalletBalance: async (payload) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/wallet/update-balance`, payload);
            return response.data;
        } catch (error) {
            console.error('Error updating wallet balance:', error);
            throw error;
        }
    }

    
};

export default apiService;