import axios from "axios";

const token = localStorage.getItem("admin-api-token");

const httpClient = axios.create({
  baseURL: "https://news-with-prisma.vercel.app/",

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

httpClient.interceptors.request.use(function (config) {
  const loading = document.getElementById("loading");

  if (loading) {
    loading.style.display = "flex";
  }

  const token = window.localStorage.getItem("admin-api-token");

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

httpClient.interceptors.response.use(
  function (response) {
    const loading = document.getElementById("loading");

    if (loading) {
      if (response.config.method !== "GET") {
        loading.style.display = "none";
      } else {
        setTimeout(() => {
          loading.style.display = "none";
        }, 300);
      }
    }

    return response;
  },

  function (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = `/`;
    } else {
      setTimeout(() => {
        const loading = document.getElementById("loading");

        if (loading) {
          loading.style.display = "none";
        }
      }, 300);

      return Promise.reject(error);
    }
  }
);

export default httpClient;
