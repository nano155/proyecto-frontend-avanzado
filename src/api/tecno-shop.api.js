import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const {VITE_API_URL} = getEnvVariables()

const tecnoShopApi = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true
});



export default tecnoShopApi;