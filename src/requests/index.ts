import axios from "axios";
import { DevicesResponse } from "models";
import { getToken, setToken } from "utility";
import { State } from "features/online-device/components/notify-modal";

export function login(body: {
  email: string;
  password: string;
}): Promise<string> {
  return axios
    .post(process.env.REACT_APP_API_URL + `/login`, body)
    .then(({ data }) => {
      setToken(data);
      return data;
    });
}

export function getDevices(): Promise<DevicesResponse> {
  return axios
    .get(process.env.REACT_APP_API_URL + `/devices`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
    .then((res) => res.data);
}

export function notify(body: State): Promise<string> {
  return axios
    .post(process.env.REACT_APP_API_URL + `/notify`, body, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
    .then((res) => {
      return res.data;
    });
}
