import axios, { AxiosRequestConfig } from "axios";


type ImageResponseType = {
    image_url: string
}


const getImgAxiosConfig = (): AxiosRequestConfig => {
    
  const token = sessionStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
       'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin" : "*"
    },
  };
};

export const uploadImage = async (image : File): Promise<ImageResponseType> => {
    const formData = new FormData();
    formData.append('image', image);
    const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/image/upload`, formData, getImgAxiosConfig()

    );
    return response.data;
};


