import { http, httpInstance } from "../util/api";

export const AuthService = {
  register: (data:any) => {
    return http.post("auth/register", data);
  },
  login: (data:any) => {
    return http.post("auth/login", data);
  },
  loginPlayer: (data:any) => {
    return http.post("auth/login-player", data);
  },
  logout: () => {
    httpInstance.removeBearerToken();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isPlayer');
  },
  forgotPassword: (email:string) => {
    return http.post('auth/forgot-password',{email})
  },
  resetPassword: (slug:string,password:string) => {
    return http.post('auth/reset-password',{slug,password})
  },
}
