import axios from "axios";
const BASE_URL = axios.create({
  baseURL: `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/api/v1`,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// const handleAddInterceptors = (instance) => {
//   // interceptors request
//   instance.interceptors.request.use(
//     (config) => {
//       const cookie = new Cookies();

//       const accessToken = cookie.get("token"); // accessToken
//       if (accessToken) {
//         console.log(accessToken);
//         accessToken = JSON.parse(accessToken);
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (err) => Promise.reject(err)
//   );
//   // interceptors response
//   instance.interceptors.response.use(
//     (resp) => resp,
//     (err) => Promise.reject(err)
//   );
// };

// handleAddInterceptors(BASE_URL);

export default BASE_URL;
