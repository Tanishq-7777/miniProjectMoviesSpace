// const BASE_URL = "http://localhost:7777/";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:7777/";
export default BASE_URL;
