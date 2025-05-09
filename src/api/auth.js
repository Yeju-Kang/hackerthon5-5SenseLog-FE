import axios from "./axiosInstance";

export const login = async (email, password) => {
  const res = await axios.post(
    "/api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  console.log("res", res);
  const { userId } = res.data.data;
  console.log("userId", res);
  console.log("userId", userId);
  localStorage.setItem("userId", userId);
  return res;
};

export const logout = async () => {
  await axios.post("/api/auth/logout", {}, { withCredentials: true });
  console.log("userId before remove:", localStorage.getItem("userId"));
};

export const signup = async ({ email, nickname, password }) => {
  const response = await axios.post("/api/auth/join", {
    email,
    nickname,
    password,
  });
  return response.data;
};
