import axios from "./axiosInstance";

export const fetchAllTodayDiaries = async (page = 0, size = 1000) => {
  return await axios.get("/api/diaries/all/today", {
    params: { page, size },
  });
};

export const fetchAllTodayDiariesByTag = async (tag, page = 0, size = 1000) => {
  return await axios.get("/api/diaries/all/today/tag", {
    params: { tag, page, size },
  });
};
