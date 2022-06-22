import axios from "axios";

import jwtDefaultConfig from "./jwtDefaultConfig";

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig };

  constructor(jwtOverrideConfig: any) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    // Request interceptor
    axios.interceptors.request.use(
      (config: any) => {
        config.baseURL = this.jwtConfig.baseUrl;
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${token}`;
        }

        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axios.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];

          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }

  login(email: string, password: string) {
    return axios.post(`${this.jwtConfig.auth}login`, {
      email,
      password,
    });
  }

  register(email: string, password: string, fullname: string) {
    return axios.post(`${this.jwtConfig.auth}register`, {
      email,
      password,
      fullname,
    });
  }

  logout() {
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `${this.jwtConfig.tokenType} ${token}`;
  }

  setUserStorage(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUserStorage() {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getUser() {
    return axios.get(`${this.jwtConfig.users}me`);
  }

  updateUser(user: any) {
    return axios.put(`${this.jwtConfig.users}me`, user);
  }

  deleteUser() {
    return axios.delete(`${this.jwtConfig.users}me`);
  }

  getUsers() {
    return axios.get(`${this.jwtConfig.users}`);
  }

  getUserById(id: string) {
    return axios.get(`${this.jwtConfig.users}${id}`);
  }

  updateUserById(id: string, user: any) {
    return axios.put(`${this.jwtConfig.users}${id}`, user);
  }

  deleteUserById(id: string) {
    return axios.delete(`${this.jwtConfig.users}${id}`);
  }

  // Favorte
  setUserFavorite(favorite: any) {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }

  getUserFavorite() {
    const favorite = localStorage.getItem("favorite")
    return favorite ?? null;
  }

  getFavorite(id: any) {
    return axios.get(`${this.jwtConfig.baseUrl}${id}/favorite`);
  }

  createFavoriteById(id: string, data: any) {
    return axios.put(`${this.jwtConfig.baseUrl}${id}/favorite`, data);
  }

  updateFavoriteById(id: string, data: any) {
    return axios.patch(`${this.jwtConfig.baseUrl}${id}/favorite`, data);
  }

  deleteFavoriteById(id: string, data: any) {
    return axios.patch(`${this.jwtConfig.baseUrl}${id}/favorite`, data);
  }
}
