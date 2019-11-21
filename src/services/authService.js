import jwtDecode from "jwt-decode";
import config from "../config/config.json";
import http from "./httpService";

const tokenKey = "token";

http.setJwt(getJwt());

function authUrl() {
  return `${config.apiEndpoint}/auth`;
}

export async function login(user) {
  const { data: token } = await http.post(authUrl(), user);
  localStorage.setItem(tokenKey, token);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.clear();
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return (jwt && jwtDecode(jwt)) || {};
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
