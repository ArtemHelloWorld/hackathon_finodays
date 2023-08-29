import axios from "axios";
import {useContext} from "react";
import AuthContext from "../context/AuthContext";


const baseURL = "http://127.0.0.1:8000/"




const useAxios = () => {
    const {accessToken} = useContext(AuthContext);
    
    const AxiosInstance = axios.create({
      baseURL, 
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    })
   

    
    return AxiosInstance;
}

export default useAxios;
