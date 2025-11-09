import { useState } from "react";
import StudyCard from "../StudyCard/StudyCard";
import { EmptyState } from "@/components/EmptyState/EmptyState";
import { CustomSelect } from "./CustomSelect/CustomSelect";
import { CiSearch } from "react-icons/ci";
import styles from "./StudyListSection.module.scss";

export function StudyListSection({
  studies = [],
  onStudyClick,
  onReactionUpdate,
}) {
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("recent");
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSearch = (e) => setSearchText(e.target.value);
  const handleSort = (e) => setSortType(e.target.value);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 3);

  const filtered = studies.filter((study) => {
    const text = (searchText || "").toLowerCase();
    const title = (study?.title || "").toLowerCase();
    const desc = (study?.description || "").toLowerCase();
    return title.includes(text) || desc.includes(text);
  });

  const sorted = [...filtered].sort((a, b) => {
    const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;

    if (sortType === "recent") return dateB - dateA;
    if (sortType === "old") return dateA - dateB;
    if (sortType === "highPoints") return (b?.points ?? 0) - (a?.points ?? 0);
    if (sortType === "lowPoints") return (a?.points ?? 0) - (b?.points ?? 0);
    return 0;
  });

  const visible = sorted.slice(0, visibleCount);

  return (
    <section>
      <h2>스터디 둘러보기</h2>

      <div className={styles.searchAndSort}>
        <div className={styles.searchBox}>
          {searchText.trim() === "" && (
            <CiSearch className={styles.searchIcon} />
          )}
          <input
            className={styles.searchInput}
            type="text"
            placeholder=" 검색"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <CustomSelect value={sortType} onChange={handleSort} />
      </div>

      {visible.length === 0 ? (
        <EmptyState message="아직 생성된 스터디가 없습니다." />
      ) : (
        <div className={styles.cardWrap}>
          {visible.map((study) => (
            <StudyCard
              key={study.id}
              {...study}
              onStudyClick={() => onStudyClick?.(study.id)}
              onReactionClick={onReactionUpdate}
            />
          ))}
        </div>
      )}

      {visibleCount < sorted.length && (
        <div className={styles.loadWrap}>
          <button className={styles.loadWrapBtn} onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      )}
    </section>
  );
}

export default StudyListSection;
