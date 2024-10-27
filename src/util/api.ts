import axios, { AxiosInstance } from 'axios';

class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `https://node-mysql-0u5t.onrender.com/api/v1/`,
      timeout: 50000,
    });
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.setBearerToken(accessToken);
    }
  }

  setBearerToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeBearerToken() {
    delete this.instance.defaults.headers.common['Authorization'];
  }
}

const httpInstance = new Http();
const http = httpInstance.instance;

export { http, httpInstance };
