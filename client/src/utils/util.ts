export interface Log {
    id: number | undefined;
    glucose: number;
    insulin: number;
    date: string;
    photo: string;
    carb: number;
    note: string;
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