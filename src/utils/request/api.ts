import axios from "../request/request";
export const loginApi = (data: any = {}) => axios.post(`login`, data);