import axios from "axios";
import { toast } from "react-toastify";
import logger from "./loggingService";

axios.interceptors.response.use(null, error => {
  if (
    error.response &&
    error.response.status >= "400" &&
    error.response.status <= "500"
  ) {
    toast.error(error.response.data);
    Promise.reject(error);
  }

  logger.log(error);
  return Promise.reject(error);
});

function setJwt(jwt) {
  if (jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
