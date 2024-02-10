import { Category } from "@/interfaces/category.interface";
import axios from "axios";

// const API_URL = 'http://www.unicomp.kz/api';
const API_URL = 'https://uni-comp.kz/api';

axios.defaults.baseURL = API_URL;

export const CategoryService = {
  async getAll() {
    const { data } = await axios.get<Category[]>('/categories');
    return data
  }
}