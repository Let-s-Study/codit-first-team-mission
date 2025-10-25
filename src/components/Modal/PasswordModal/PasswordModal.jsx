import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Modal } from "../Modal";
import styles from "./PasswordModal.module.scss";

export function PasswordModal({ isOpen, closeModal, onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // { password?: string, server?: string }
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const isSuccess = await auth.handleVerifyStudyId(password);

    if (isSuccess) {
      onSuccess();
      closeModal();
    } else {
      setError("인증 실패");
    }
  };
  const handleClose = () => {
    setPassword("");
    setError();
    closeModal();
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Modal isOpen={isOpen}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeButton}
          >
            나가기
          </button>
          <p>권한이 필요해요!</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <Input
            id="password-input"
            className={styles.input}
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력해 주세요"
            onChange={handleChange}
            required
          />
          {error && <p className={styles.errorMessage}>{error}</p>} //에러
          메시지
          <button type="submit" className={styles.submitButton}>
            확인
          </button>
        </form>
      </div>
    </Modal>
  );
}
