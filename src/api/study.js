import apiClient from "./client";
const BASE_URL = "/studies";

export const loginStudy = async (studyId, password) => {
  const API_ENDPOINT = `${BASE_URL}/${studyId}/verify`;

  try {
    await apiClient.post(API_ENDPOINT, { password });
    return true;
  } catch (error) {
    console.error("로그인API 에러", error);
    throw new Error(error.response?.data?.message || "로그인에 실패했습니다");
  }
};

export const addPointsToStudy = async (studyId, amount) => {
  const API_ENDPOINT = `${BASE_URL}/${studyId}/points`;
  try {
    const response = await apiClient.patch(API_ENDPOINT, { amount });
    return response.data.data;
  } catch (error) {
    console.error("포인트 추가 API 에러", error);
    if (error.response?.status === 403) {
      alert("다시 로그인해주세요.");
    }
    throw new Error(
      error.response?.data?.message || "포인트 추가에 실패했습니다."
    );
  }
};

export const getAllStudies = async () => {
  try {
    const response = await apiClient.get(BASE_URL);
    return response.data.data;
  } catch (error) {
    console.error("모든 스터디 조회 API 에러", error);
    throw new Error(
      error.response?.data?.message || "스터디 목록을 불러오지 못했습니다."
    );
  }
};
