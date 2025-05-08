import axios from "./axiosInstance";

export const login = async (email, password) => {
  const res = await axios.post(
    "/api/auth/login",
    { email, password },
    { withCredentials: true }
  );

  const { userId } = res.data;
  localStorage.setItem("userId", userId);
  return res;
};

export const logout = async () => {
  await axios.post("/api/auth/logout", {}, { withCredentials: true });
  localStorage.removeItem("userId");
};
