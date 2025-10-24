const BASE_URL = "/api/studies";

export const loginStudy = async (studyId, password) => {
  const API_ENDPOINT = `${BASE_URL}/${studyId}/verify`;

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ password }),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "로그인에 실패했습니다");
  }
  return true;
};

export const addPointsToStudy = async (studyId, amount) => {
  const API_ENDPOINT = `${BASE_URL}/${studyId}/points`;
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      if (response.status === 403) {
        alert(" 다시 로그인해주세요");
      }
      throw new Error(result.message || "포인트 추가에 실패했습니다");
    }
    return result.data;
  } catch (error) {
    console.error("포인트 API 호출 오류", error);
    throw error;
  }
};
