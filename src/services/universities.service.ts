import { Univer } from "@/interfaces/univer.interface";
import axios from "axios";

// const API_URL = 'http://www.unicomp.kz/api';
const API_URL = 'http://uni-comp.kz/api';

axios.defaults.baseURL = API_URL;

export const UniverService = {
  async getAll() {
    const { data } = await axios.get<Univer[]>('/universities');
    return data;
  },

  async getUniverById(id: any) {
    const data = await this.getAll();

    return data.filter((el) => el._id.toString() === id)[0];
  }
}