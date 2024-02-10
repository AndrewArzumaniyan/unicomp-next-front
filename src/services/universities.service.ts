import { Univer } from "@/interfaces/univer.interface";
import axios from "axios";

// const API_URL = 'http://www.unicomp.kz/api';
const API_URL = 'https://uni-comp.kz/api';

axios.defaults.baseURL = API_URL;

export const UniverService = {
  async getAll() {
    const { data } = await axios.get<Univer[]>('/universities');
    return data;
  }
}