import apiClient from "./client";

const HABITS_BASE_URL = "/api/habits";
const RECORDS_BASE_URL = "/api/habit-records";

/**
 * 습관 목록 가져오기
 * @param {string} studyId - 습관 목록을 조회할 스터디의 ID
 * @returns {Promise<Array>} 습관 객체 배열
 */
export const getHabitsByStudyId = async (studyId) => {
  try {
    const response = await apiClient.get(`${HABITS_BASE_URL}/${studyId}`);
    return response.data.data;
  } catch (error) {
    console.error("스터디별 습관 조회 API 오류:", error);
    throw new Error(
      error.response?.data?.message || "습관을 불러오는 데 실패했습니다."
    );
  }
};

/**
 * 습관 생성
 * @param {object} habitData - { title, studyId } 형태의 객체
 * @returns {Promise<object>} 생성된 습관 객체
 */
export const createHabit = async (habitData) => {
  try {
    const response = await apiClient.post(HABITS_BASE_URL, habitData);
    return response.data.data;
  } catch (error) {
    console.error("습관 생성 API 오류:", error);
    throw new Error(
      error.response?.data?.message || "습관 생성에 실패했습니다."
    );
  }
};

/**
 * 기존 습관 수정
 * @param {string} habitId - 수정할 습관의 ID
 * @param {object} updatedData - { title } 형태의 객체
 * @returns {Promise<object>} 수정된 습관 객체
 */
export const updateHabit = async (habitId, updatedData) => {
  try {
    const response = await apiClient.patch(
      `${HABITS_BASE_URL}/${habitId}`,
      updatedData
    );
    return response.data.data;
  } catch (error) {
    console.error("습관 수정 API 오류:", error);
    throw new Error(
      error.response?.data?.message || "습관 수정에 실패했습니다."
    );
  }
};

/**
 * 특정 습관 삭제
 * @param {string} habitId - 삭제할 습관의 ID
 * @returns {Promise<object>} API 응답 결과
 */
export const deleteHabit = async (habitId) => {
  try {
    const response = await apiClient.delete(`${HABITS_BASE_URL}/${habitId}`);
    return response.data;
  } catch (error) {
    console.error("습관 삭제 API 오류:", error);
    throw new Error(
      error.response?.data?.message || "습관 삭제에 실패했습니다."
    );
  }
};

// 습관 기록

/**
 * 습관 기록을 생성
 * @param {string} habitId - 기록을 추가할 습관의 ID
 * @returns {Promise<object>} 생성된 기록 객체
 */
export const createHabitRecord = async (habitId) => {
  try {
    const response = await apiClient.post(RECORDS_BASE_URL, { habitId });
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 409) {
      console.warn("이미 오늘 기록된 습관입니다.");
    }
    console.error("습관 기록 생성 API 오류:", error);
    throw new Error(
      error.response?.data?.message || "습관 기록에 실패했습니다."
    );
  }
};

/**
 * 습관 기록 삭제
 * @param {string} recordId - 삭제할 기록의 ID
 * @returns {Promise<object>} API 응답 결과
 */
export const deleteHabitRecord = async (recordId) => {
  try {
    const response = await apiClient.delete(`${RECORDS_BASE_URL}/${recordId}`);
    return response.data;
  } catch (error) {
    console.error("습관 기록 삭제 API 오류:", error);
    throw new Error(
      error.response?.data?.message || "습관 기록 삭제에 실패했습니다."
    );
  }
};
