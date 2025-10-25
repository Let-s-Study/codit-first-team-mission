import styles from "./TodayButtons.module.scss";
import arrowRight from "@/assets/img/ic_arrow_right.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PasswordModal } from "@/components/Modal/PasswordModal/PasswordModal";

export function TodayButtons({ value }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetPath, setTargetPath] = useState("");

  const handleNavigation = (path) => {
    const relativePath = path.startWith("/") ? path.substring(1) : path;
    if (auth.hasPermission) {
      navigate(relativePath);
    } else {
      setTargetPath(relativePath);
      setIsModalOpen(true);
    }
  };

  const handleModalSuccess = () => {
    navigate(targetPath);
  };

  const homePath = "/";

  const buttonConfig = {
    detail: [
      <button key="detail" onClick={() => handleNavigation("habit")}>
        오늘의 습관
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
      <button key="detail2" onClick={() => handleNavigation("focus")}>
        오늘의 집중
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
    ],
    focus: [
      <button key="focus1" onClick={() => handleNavigation("habit")}>
        오늘의 습관
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
      <button key="focus2" onClick={() => navigate(homePath)}>
        홈
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
    ],
    habit: [
      <button key="habit" onClick={() => navigate(homePath)}>
        홈
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
      <button key="habit2" onClick={() => handleNavigation("focus")}>
        오늘의 집중
        <img src={arrowRight} className={styles.arrowIcon} alt="arrow icon" />
      </button>,
    ],
  };

  const currentButtons = buttonConfig[value];

  return (
    <>
      <div className={styles.menuContainer}>{currentButtons}</div>
      {isModalOpen && (
        <PasswordModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          onSuccess={handleModalSuccess}
        />
      )}
    </>
  );
}
