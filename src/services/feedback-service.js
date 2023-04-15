import { axiosMethod } from "./helper";

export const findSkills = (config) => {
  return axiosMethod
    .get("/skill/findall", config)
    .then((response) => response.data)
    .catch((err) => {});
};

export const findSoftSkills = (config) => {
  return axiosMethod
    .get("/skill/softskill", config)
    .then((response) => response.data)
    .catch((err) => {});
};

export const getFeedbackAllData = (config) => {
  return axiosMethod.get('/allformsdata',config)
  .then((response) => response.data)
  .catch(error => {
   })
}

// export const submitForm = (config) => {
//   return axiosMethod
//     .post("/form", config)
//     .then((response) => {})
//     .catch((err) => {});
// };
