import axios from "axios";

const API_URL = "http://localhost:5011/api"; 

export const getMessage = async () => {
    try {
        const response = await axios.get(`${API_URL}/test`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return null;
    }
};
