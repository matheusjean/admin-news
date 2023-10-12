import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://news-with-prisma.vercel.app/",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default httpClient;
