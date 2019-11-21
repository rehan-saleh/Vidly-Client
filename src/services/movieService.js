import config from "../config/config.json";
import http from "./httpService";

function movieUrl(id) {
  return id
    ? `${config.apiEndpoint}/movies/${id}`
    : `${config.apiEndpoint}/movies`;
}

export function getMovies() {
  return http.get(movieUrl());
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  const { _id: id } = movie;
  if (id) {
    return http.put(movieUrl(id), movie);
  }
  delete movie._id;
  return http.post(movieUrl(), movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
