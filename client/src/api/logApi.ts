import axios, { AxiosRequestConfig } from "axios";
import { Log } from "../utils/util";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*"
    },
  };
};

//// LOG CRUD ////

// GET

export const getLogs = async (): Promise<Log[]> => {
  const response =  await axios.get(`${import.meta.env.VITE_URL}/api/log`, getAxiosConfig());

  return response.data;
 
}

export const getLog = async (id: number): Promise<Log> => {
  const response =  await axios.get(`${import.meta.env.VITE_URL}/api/log/${id}`, getAxiosConfig());

  return response.data;
 
}

export const getLogsPage = async (page: number): Promise<Log[]> => {
  const response =  await axios.get(`${import.meta.env.VITE_URL}/api/log/page/${page}`, getAxiosConfig());

  return response.data;
 
}

export const getTotalLogs = async (): Promise<number> => {
  const response =  await axios.get(`${import.meta.env.VITE_URL}/api/log/count`, getAxiosConfig());
  
  return response.data;
   
}

export const getFilteredLogs = async (filter: string, value: string): Promise<Log[]> => {
  const response =  await axios.get(`${import.meta.env.VITE_URL}/api/log/filter/${filter}/${value}`, getAxiosConfig());

  return response.data;
}

// POST

export const addLog = async (log: Log): Promise<Log> => {
  const response = await axios.post(`${import.meta.env.VITE_URL}/api/log`, log, getAxiosConfig());

  return response.data;
}


// PATCH

export const updateLog = async(log: Log): Promise<Log> => {
  const response = await axios.patch(`${import.meta.env.VITE_URL}/api/log/${log.id}`, log, getAxiosConfig());

  return response.data;
}

// DELETE

export const deleteLog = async(logId : number) => {
  const response = await axios.delete(`${import.meta.env.VITE_URL}/api/log/${logId}`, getAxiosConfig());

  return response.data;
}

////  ////