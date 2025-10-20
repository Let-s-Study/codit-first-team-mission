import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./CustomSelect.module.scss";

export function CustomSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef();

  const options = [
    { value: "recent", label: "최근 순" },
    { value: "old", label: "오래된 순" },
    { value: "highPoints", label: "많은 포인트 순" },
    { value: "lowPoints", label: "적은 포인트 순" },
  ];

  const handleSelect = (val) => {
    onChange({ target: { value: val } });
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={styles.customSelect}>
      <button
        type="button"
        className={styles.selectBtn}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>
          {options.find((opt) => opt.value === value)
            ? options.find((opt) => opt.value === value).label
            : "정렬 선택"}
        </span>
        <IoIosArrowDown
          className={`${styles.arrow} ${open ? styles.open : ""}`}
        />
      </button>

      {open && (
        <ul className={styles.optionList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${styles.option} ${
                value === opt.value ? styles.active : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
