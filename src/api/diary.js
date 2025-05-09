import axios from "./axiosInstance";

export const createDiary = async (diaryRequestDto) => {
  const userId = localStorage.getItem("userId");
  return await axios.post("/api/diaries", diaryRequestDto, {
    params: { userId },
  });
};

export const fetchDiaryList = async (page = 0, size = 20) => {
  return await axios.get("/api/diaries/mine", {
    params: { page, size },
  });
};

export const fetchDiaryByDay = async (date) => {
  return await axios.get("/api/diaries/mine/day", {
    params: { date },
  });
};

export const deleteDiary = async (diaryId) => {
  return await axios.delete(`/api/diaries/${diaryId}`, {});
};
