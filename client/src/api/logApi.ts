import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Log, logFilters, LogResponse } from "../utils/util";

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
  const response =  await axios.get(`${import.meta.env.VITE_URL}/api/v1/logs`, getAxiosConfig());

  return response.data;
 
}

export const getLogsPage = async (page: number): Promise<LogResponse> => {
  const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/logs`, { headers: getAxiosConfig().headers, params: {page: page}} );
 
  return response.data;
}

export const getLog = async (id: number): Promise<Log> => {
  const response =  await axios.get(`${import.meta.env.VITE_URL}/api/v1/logs/${id}`, getAxiosConfig());

  return response.data;
 
}


export const getFilteredLogs = async (value: logFilters): Promise<LogResponse> => {
  const response =  await axios.get(`${import.meta.env.VITE_URL}/api/v1/logs`, {headers: getAxiosConfig().headers, params: value});

  return response.data;
}

// POST

export const addLog = async (log: Log): Promise<AxiosResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/logs`, log, getAxiosConfig());

  return response;
}


// PATCH

export const updateLog = async(log: Log): Promise<Log> => {
  const response = await axios.patch(`${import.meta.env.VITE_URL}/api/v1/logs/${log.id}`, log, getAxiosConfig());

  return response.data;
}

// DELETE

export const deleteLog = async(logId : number) => {
  const response = await axios.delete(`${import.meta.env.VITE_URL}/api/v1/logs/${logId}`, getAxiosConfig());

  return response.data;
}

////  ////