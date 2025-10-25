import styles from "./TodayButtons.module.scss";
import arrowRight from "@/assets/img/ic_arrow_right.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import PaswordModal from "../../Modal/PasswordModal/PasswordModal";

export function TodayButtons({ value }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetPath, setTargetPath] = useState("");

  const handleNavigation = (path) => {
    if (auth.hasPermission) {
      navigate(`/study/${auth.studyId}/${path}`);
    } else {
      setTargetPath(path);
      setIsModalOpen(true);
    }
  };
  const handleModalSuccess = () => {
    navigate(`/study/${auth.studyId}/${targetPath}`);
  };

  const buttonConfig = {
    detail: [
      <button key="detail" onClick={() => handleNavigation("habit")}>
        오늘의 습관
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
      <button key="detail2">
        오늘의 집중
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
    ],
    focus: [
      <button key="focus1">
        오늘의 습관
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
      <button key="focus2">
        홈
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
    ],
    habit: [
      <button key="habit">
        오늘의 습관
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
      <button key="habit2">
        오늘의 집중
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
    ],
  };

  const currentButtons = buttonConfig[value];

  return (
    <>
      <div className={styles.menuContainer}>{currentButtons}</div>;
      {isModalOpen && (
        <PaswordModal
          closeModal={() => setIsModalOpen(false)}
          onSuccess={handleModalSuccess}
        />
      )}
    </>
  );
}
