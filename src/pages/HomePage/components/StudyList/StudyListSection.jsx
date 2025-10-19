import { useState } from "react";
import StudyCard from "../StudyCard/StudyCard";
import EmptyState from "../EmptyState/EmptyState";
import CustomSelect from "./CustomSelect/CustomSelect";
import { CiSearch } from "react-icons/ci";
import styles from "./StudyListSection.module.scss";

function StudyListSection({ studies, onStudyClick, onReactionUpdate }) {
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("recent");
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSearch = (e) => setSearchText(e.target.value);
  const handleSort = (e) => setSortType(e.target.value);
  const handleLoadMore = () => setVisibleCount(visibleCount + 3);

  const filtered = studies.filter((study) => {
    const text = searchText.toLowerCase();
    return (
      study.title.toLowerCase().includes(text) ||
      study.description.toLowerCase().includes(text)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortType === "recent") return b.id - a.id;
    if (sortType === "old") return a.id - b.id;
    if (sortType === "highPoints") return b.points - a.points;
    if (sortType === "lowPoints") return a.points - b.points;
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
              onClick={() => onStudyClick(study.id)}
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
