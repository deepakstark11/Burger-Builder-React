import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-stark.firebaseio.com/",
});

export default instance;
