import apiClient from "@/api/client";

const unwrap = (res) => res?.data?.data ?? res?.data ?? res;

export const getHabits = async (studyId) => {
  const res = await apiClient.get(`/habits/${studyId}`);
  return unwrap(res);
};

export const getHabitsByStudyId = getHabits;

export const getTodayCompleted = async (studyId, day) => {
  const res = await apiClient.get("/habit-records", {
    params: { studyId, day },
  });
  return unwrap(res);
};

export const toggleHabitRecord = async (habitId, day) => {
  const res = await apiClient.post("/habit-records", { habitId, day });
  return unwrap(res);
};
