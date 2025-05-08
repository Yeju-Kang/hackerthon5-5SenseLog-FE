// src/api/diaryLikes.js
import axios from "./axiosInstance"; // 이미 세팅된 인스턴스가 있다면

export const submitDiaryEmotion = async (diaryId, userId, emotion) => {
  const response = await axios.post(`/api/diaries/${diaryId}/likes`, null, {
    params: { userId, emotion },
  });
  return response.data;
};
