import axios from "axios";
import { User } from "../utils/util";


export const loginUser = async (user: User): Promise<{token: string}> => {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/login`, user, 
        {headers: { "Content-Type": "application/json" }}
    );
    return response.data;
};

export const registerUser = async (user: User): Promise<{token: string}> => {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/register`, user, 
        {headers: { "Content-Type": "application/json" }}
    );
    return response.data;
};