import axios from "../request/request";
export const loginApi = (data: any = {}) => axios.post(`login`, data);
export const getBannerListApi = () => axios.get(`banner`);
export const addBannerApi = (data: any = {}) => axios.post('banner', data);
export const deleteBannerApi = (data: any = {}) => axios.post('banner/delete', data);
export const updateBannerApi = (data: any = {}) => axios.post('banner/update', data);