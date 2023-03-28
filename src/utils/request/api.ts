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


/*  product start */
export const getProductListApi = () => axios.get(`product`);
export const addProductApi = (data: any = {}) => axios.post('product', data);
export const deleteProductApi = (data: any = {}) => axios.post('product/delete', data);
export const updateProductApi = (data: any = {}) => axios.post('product/update', data);
/*  product end */

/*  header start */
export const getHeaderListApi = () => axios.get(`header`);
export const addHeaderApi = (data: any = {}) => axios.post('header', data);
export const deleteHeaderApi = (data: any = {}) => axios.post('header/delete', data);
export const updateHeaderApi = (data: any = {}) => axios.post('hader/update', data);
/*  header end */

