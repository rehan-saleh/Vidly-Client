import config from "../config/config.json";
import http from "./httpService";

export function getGenres() {
  return http.get(`${config.apiEndpoint}/genres`);
}
