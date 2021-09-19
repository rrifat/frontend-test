import axios from "axios";

export function login(body: {
  email: string;
  password: string;
}): Promise<string> {
  return axios
    .post(process.env.REACT_APP_API_URL + `/login`, body)
    .then((res) => res.data);
}
