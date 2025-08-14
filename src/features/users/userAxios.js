import axios from "axios";
import { apiProcesser, authEP } from "../../helpers/axiosHelpers.js";
const root = import.meta.env.VITE_API_ROOT || "http://localhost:8000/api/customer/v1";
// /auth/signup
export const postNewUser = (userObj) =>
  apiProcesser({
    method: "post",
    url: authEP + "/signup",
    data: userObj,
  });

export const loginUser = async (cred) => {
  const { data } = await axios.post(`${root}/auth/login`, cred);
  // expect: { status, message, tokens: {accessJWT, refreshJWT}, user }
  return data;
};

export const fetchProfile = async () => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const { data } = await axios.get(`${root}/auth/profile`, {
     headers: { Authorization: accessJWT ? `Bearer ${accessJWT}` : "" },
  });
  // expect: { status, payload }
  return data;
};

export const renewAccessJWT = async () => {
  const refreshJWT = localStorage.getItem("refreshJWT");
  if (!refreshJWT) return { payload: null };

  const { data } = await axios.get(`${root}/tokens/renew`, {
    headers: { Authorization: refreshJWT },
  });
  // expect: { status, payload: <newAccessJWT> }
  return data;
};