import Axios from 'axios';

// Buat instance Axios
const axios = Axios.create({
    baseURL: 'https://strategic-adina-nurman-629004a9.koyeb.app/api',
    timeout: 60000,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer opiuiunouOIUOIBUIQUIQUI909898127iuyi78998anuikiuitu665qq545q61vguyiuyqt6quyigs'
    }
});

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    alert('Bad Request: ' + error.response.data.message);
                    break;
                case 401:
                    alert('Unauthorized: ' + error.response.data.message);
                    window.location.href = '/login';
                    break;
                case 403:
                    alert('Forbidden: ' + error.response.data.message);
                    break;
                case 404:
                    alert('Not Found: ' + error.response.data.message);
                    break;
                case 500:
                    alert('Internal Server Error: ' + error.response.data.message);
                    break;
                default:
                    alert('Error: ' + error.response.data.message);
            }
        } else if (error.request) {
            alert('No Response from Server: ' + error.message);
        } else {
            alert('Request Error: ' + error.message);
        }

        return Promise.reject(error);
    }
);

export default axios;
