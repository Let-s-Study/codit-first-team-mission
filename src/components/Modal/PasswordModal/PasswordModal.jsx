import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Modal } from "../Modal";
import styles from "./PasswordModal.module.scss";

export function PasswordModal({ isOpen, closeModal, onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 문자열로 일관
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const isSuccess = await auth?.handleVerifyStudyId?.(password);
      if (isSuccess) {
        onSuccess?.();
        closeModal?.();
        setPassword("");
      } else {
        setError("인증 실패");
      }
    } catch (err) {
      console.error(err);
      setError("서버 통신 중 오류가 발생했습니다.");
    }
  };

  const handleClose = () => {
    setPassword("");
    setError("");
    closeModal?.();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.contentWrapper}>
        <header className={styles.header}>
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="닫기"
          >
            나가기
          </button>
          <p>권한이 필요해요!</p>
        </header>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <input
            id="password-input"
            className={styles.input}
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력해 주세요"
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          {/* 에러 메시지 */}
          {error && (
            <p className={styles.errorMessage} role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!password.trim()}
            aria-disabled={!password.trim()}
          >
            확인
          </button>
        </form>
      </div>
    </Modal>
  );
}
