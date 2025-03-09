import axios from "axios";
import { UnitType, User, UserResponseType } from "../utils/util";
import { getAxiosConfig } from "./axiosConfig";




export const loginUser = async (user: User): Promise<UserResponseType> => {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/login`, user, 
        {headers: getAxiosConfig().headers}
    );
    return response.data;
};

export const registerUser = async (user: User): Promise<UserResponseType> => {
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/register`, user, 
        {headers: getAxiosConfig().headers}
    );
    return response.data;
};


export const updateUserUnit = async (unit: number) : Promise<{message: string, unit: UnitType}> => {
    const response = await axios.patch(`${import.meta.env.VITE_URL}/api/v1/users/updateUnit` , null, {headers: getAxiosConfig().headers, params: {unit: unit}})

    return response.data;
}