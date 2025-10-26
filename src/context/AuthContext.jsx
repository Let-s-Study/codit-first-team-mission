import { createContext, useState, useEffect, useContext } from "react";
import { loginStudy, getAllStudies } from "@/api/study";
import { getHabitsByStudyId } from "@/api/habits";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, studyId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const [study, setStudy] = useState(null);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (studyId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setHasPermission(false);
      setStudy(null);
      setHabits([]);
    }
  }, [studyId]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (hasPermission && studyId) {
        try {
          const [allStudies, habitsData] = await Promise.all([
            getAllStudies(),
            getHabitsByStudyId(studyId),
          ]);
          const currentStudy = allStudies.find((study) => study.id === studyId);
          setStudy(currentStudy);
          setHabits(habitsData);
        } catch (error) {
          console.error("데이터 로딩 실패", error);
          setStudy(null);
          setHabits([]);
        }
      }
    };
    fetchAllData();
  }, [hasPermission, studyId]);

  const handleVerifyStudyId = async (password) => {
    if (!studyId) {
      console.error("스터디에 접속해서 시도해주세요.");
      setHasPermission(false);
      return false;
    }
    try {
      await loginStudy(studyId, password);

      setHasPermission(true);
      return true;
    } catch (error) {
      console.error("비밀번호가 잘못되었습니다:", error);
      setHasPermission(false);
      return false;
    }
  };
  const value = {
    isLoggedIn,
    hasPermission,
    handleVerifyStudyId,
    studyId,
    study,
    habits,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
