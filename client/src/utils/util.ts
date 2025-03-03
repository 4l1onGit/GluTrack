import axios from "axios";

export interface Log {
    id: number | undefined;
    glucose: number;
    insulin: number;
    date: string;
    photo: string;
    carb: number;
    note: string;
  }


  export interface LogResponse {
    page: number,
    totalRecords: number,
    maxPage: number,
    data: Log[]
  }

  export interface logFilters {
    day?: string, // 00 format
    week?: boolean, // Show week based off day
    month?: string, // 00 format
    year?: string, // 0000 format
  }


  export function createDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const hour = date.getHours();
    const minutes = date.getMinutes();
  
    return `${day}-${month}-${year}-${hour}:${minutes}`;
  }
  
  export function modifyDate(date: string) {
    const dateStamp = date.slice(0, 10);
    const year = dateStamp.slice(0, 4);
    const month = dateStamp.slice(5, 7);
    const day = dateStamp.slice(8, 10);
    const time = date.slice(11, 16);
  
    return `${day}-${month}-${year}-${time}`;
  }

  export function convertDateDefault(date: string) {
  
    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6, 10);

    const hours = date.slice(11, 13);
    const mins = date.slice(14, 16)

    return `${year}-${month}-${day}T${hours}:${mins}`
  }


export function postCache() {
  if( localStorage.getItem("createLog")) {
     localStorage
        .getItem("createLog")
        ?.split("+")
        .forEach((data) => {
           postLog(JSON.parse(data));
        });
        localStorage.removeItem("createLog");
  }
}

export async function postLog(data : Log) {
  axios
  .post(`${import.meta.env.VITE_URL}/log/create`, data)
  .then((res) => {
    if (res.status == 200) {
      console.log(res);
    }  
  })
  .catch((err) => {
    console.log(err);
  });
}


export const enum graphFilter {
  BLOOD_SUGAR = "sugar",
  CARBS = "carbs",
  INSULIN = "insulin",
  ALL = "all",
}

export const enum graphTimeFilter {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export type btnToggles = {
  label: string;
  style: string;
  filter: graphFilter | graphTimeFilter;
  icon?: React.ReactNode;
};


export type User = {
  username: string;
  password: string;
};