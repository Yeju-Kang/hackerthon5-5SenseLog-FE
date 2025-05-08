// src/api/diaryApi.js
import axios from "./axiosInstance"; // 이미 세팅된 인스턴스가 있다면

export const createDiary = async (userId, diaryRequestDto) => {
  console.log("userId", userId);
  console.log("diaryRequestDto", diaryRequestDto);
  const response = await axios.post(
    `/api/diaries?userId=${userId}`,
    diaryRequestDto
  );
  console.log("response", response);
  return response;
};
