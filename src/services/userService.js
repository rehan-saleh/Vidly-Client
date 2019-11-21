import config from "../config/config.json";
import http from "./httpService";
import auth from "./authService.js";

function userUrl() {
  return `${config.apiEndpoint}/users`;
}

export async function register(user) {
  const { data: response } = await http.post(userUrl(), user);
  auth.loginWithJwt(response.headers["x-auth-token"]);
}

export default {
  register
};
