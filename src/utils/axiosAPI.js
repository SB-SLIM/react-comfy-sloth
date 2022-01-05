import axios from "axios";

export const axiosApi = async (url) => {
  return axios(url)
    .then((response) => {
      return { data: response.data };
    })
    .catch((err) => {
      return { isError: true, msg: err };
    });
};
