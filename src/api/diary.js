import axios from "./axiosInstance";

export const createDiary = async (diaryRequestDto) => {
  const userId = localStorage.getItem("userId");
  return await axios.post("/api/diaries", diaryRequestDto, {
    params: { userId },
  });
};

export const fetchDiaryList = async (page = 0, size = 20) => {
  const userId = localStorage.getItem("userId");
  return await axios.get("/api/diaries/mine", {
    params: { userId, page, size },
  });
};
