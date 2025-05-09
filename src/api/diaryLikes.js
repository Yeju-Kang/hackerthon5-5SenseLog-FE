import axios from "./axiosInstance";

export const submitDiaryEmotion = async (diaryId, emotion) => {
  console.log("emotion", emotion);
  const userId = localStorage.getItem("userId");
  const response = await axios.post(`/api/diaries/${diaryId}/likes`, null, {
    params: { userId, emotion },
  });
  return response.data;
};
