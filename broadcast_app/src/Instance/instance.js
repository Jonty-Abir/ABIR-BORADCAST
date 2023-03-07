import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
/***_______  Axios Interceptors   ________**/
instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/refresh-token`, {
          withCredentials: true,
        });
        return instance.request(originalRequest);
      } catch (err) {
        console.log(`${err.message}! from axios interceptors :)`);
      }
    }
    throw err;
  }
);

export default instance;
