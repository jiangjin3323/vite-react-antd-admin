import axios from "../request/request";
export const loginApi = (data: any = {}) => axios.post(`login`, data);


/*  banner start */
export const getBannerListApi = () => axios.get(`banner`);
export const addBannerApi = (data: any = {}) => axios.post('banner', data);
export const deleteBannerApi = (data: any = {}) => axios.post('banner/delete', data);
export const updateBannerApi = (data: any = {}) => axios.post('banner/update', data);
/*  banner end */

/*  user start */
export const getUserListApi = () => axios.get(`login/user`);
export const addUserApi = (data: any = {}) => axios.post('user', data);
export const deleteUserApi = (data: any = {}) => axios.post('user/delete', data);
export const updateUserApi = (data: any = {}) => axios.post('user/update', data);
/*  user end */