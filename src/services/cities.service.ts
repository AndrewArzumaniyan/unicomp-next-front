import axios from "axios"

// const API_URL = 'http://www.unicomp.kz/api';
const API_URL = 'http://uni-comp.kz/api';

axios.defaults.baseURL = API_URL;

export const CityService = {
  async getAll() {
    const { data } = await axios.get<any>('/gid');
    return data;
  }
}