import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-e56e6-default-rtdb.firebaseio.com/",
});

export default instance;
