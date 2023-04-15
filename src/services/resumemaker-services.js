import { axiosMethod } from "./helper";

export const signUp = (user) => {
    return axiosMethod.post('/account/register', user)
    .then((response) => response.data)
    .catch(error => {
     })
}

export const getResumeAllData = (config) => {
    return axiosMethod.get('/resume/getallresume',config)
    .then((response) => response.data)
    .catch(error => {
     })
}

export const getUsersAllData = (config) => {
    return axiosMethod.get('/account/getallusers',config)
    .then((response) => response.data)
    .catch(error => {
     })
}

export const getResumeData = (config, id) => {
    return axiosMethod.get(`/resume/getresume/${id}`,config)
    .then((response) => response.data)
    .catch(error => {
     })
}

export const deleteUserById =async (userUUID,config ) => {
    return await axiosMethod.put(`/account/deletebyid/${userUUID}`,{}, config)
    
}

export const resumeSave = (config, data) => {
    return axiosMethod.post('/resume/saveresume', data, config)
      .then((response) => response.data)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }