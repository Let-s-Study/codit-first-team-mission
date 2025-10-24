import React, { createContext, useState, useEffect, useContext } from "react";
import { loginStudy } from "../api/study";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, studyId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    if (studyId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setHasPermission(false);
    }
  }, [studyId]);

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => { // AuthProvider 안에서만 사용
  const context = useContext(AuthContext); 
  return context;
};
