import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import apiClient from "@/api/client";
import { SelectEmojis } from "./SelectEmojis";
import { TrackContainer } from "../HabitTracker/TrackContainer";
import { TodayButtons } from "@/components/Buttons/TodayButtons/TodayButtons";
import { EarnedPoints } from "@/components/Points/EarnedPoints";
import { EmojiProvider } from "@/context/EmojiContext";
import { AuthStudyContents } from "@/components/Modal/Contents/AuthStudyContents";
import { Modal } from "@/components/Modal/Modal";
import style from "./StudyDetailPage.module.scss";

function StudyDetailPage() {
  const { studyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const createdStudy = location?.state?.createdStudy || null;
  const [study, setStudy] = useState(createdStudy);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(!createdStudy);
  const [error, setError] = useState("");

  const [optimisticAward, setOptimisticAward] = useState(null);
  const appliedRef = useRef(false);

  useEffect(() => {
    const delta = location.state?.awardDelta;
    const total = location.state?.awardTotal;
    if (delta == null && total == null) return;

    setOptimisticAward({ delta, total });

    setStudy((prev) => {
      const base = typeof prev?.totalPoint === "number" ? prev.totalPoint : 0;
      const next = typeof total === "number" ? total : base + (delta ?? 0);

      return { ...(prev || {}), totalPoint: next };
    });

    navigate(".", { replace: true, state: null });
  }, [location.state, navigate]);

  useEffect(() => {
    function onPoints(e) {
      const { studyId: sid, delta, total } = e.detail || {};
      if (sid !== studyId) return;
      setStudy((prev) => {
        const base = typeof prev?.totalPoint === "number" ? prev.totalPoint : 0;
        const next = typeof total === "number" ? total : base + (delta ?? 0);
        return { ...(prev || {}), totalPoint: next };
      });
    }
    window.addEventListener("study:points-updated", onPoints);
    return () => window.removeEventListener("study:points-updated", onPoints);
  }, [studyId]);

  useEffect(() => {
    if (!studyId) {
      setError("잘못된 접근입니다.");
      setLoading(false);
      return;
    }
    let ignore = false;

    async function fetchStudy() {
      if (createdStudy && createdStudy.id === studyId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const id = encodeURIComponent(studyId);
        let data = null;

        try {
          const r1 = await apiClient.get(`/studies/${id}`);
          data = r1?.data?.data ?? r1?.data ?? null;
        } catch (err1) {
          try {
            const r2 = await apiClient.get(`/study/${id}`);
            data = r2?.data?.data ?? r2?.data ?? null;
          } catch {
            const r3 = await apiClient.get(`/studies`);
            const list = r3?.data?.data ?? r3?.data ?? [];
            if (Array.isArray(list))
              data = list.find((s) => s?.id === studyId) ?? null;
          }
        }

        // 🔁 서버 응답이 와도 optimisticAward를 머지해 유지
        if (data && optimisticAward && !appliedRef.current) {
          const base =
            typeof data.totalPoint === "number" ? data.totalPoint : 0;
          const next =
            typeof optimisticAward.total === "number"
              ? optimisticAward.total
              : base + (optimisticAward.delta ?? 0);
          data = { ...data, totalPoint: next };
          appliedRef.current = true; // 이후 중복 머지 방지
        }

        if (!ignore) {
          if (data) setStudy(data);
          else setError("해당 스터디를 찾을 수 없습니다.");
        }
      } catch (e) {
        const code = e?.response?.status;
        const msg =
          (typeof e?.response?.data?.message === "string" &&
            e.response.data.message) ||
          (typeof e?.response?.data?.error === "string" &&
            e.response.data.error) ||
          "스터디 정보를 불러오지 못했습니다.";
        if (!ignore) setError(msg);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchStudy();

    return () => {};
  }, [studyId, createdStudy, optimisticAward]);

  const handleEmojiSaved = async () => {
    try {
      const id = encodeURIComponent(studyId);
      let data = null;
      try {
        const r1 = await apiClient.get(`/studies/${id}`);
        data = r1?.data?.data ?? r1?.data ?? null;
      } catch {
        try {
          const r2 = await apiClient.get(`/study/${id}`);
          data = r2?.data?.data ?? r2?.data ?? null;
        } catch {
          const r3 = await apiClient.get(`/studies`);
          const list = r3?.data?.data ?? r3?.data ?? [];
          if (Array.isArray(list))
            data = list.find((s) => s?.id === studyId) ?? null;
        }
      }
      if (data) {
        if (optimisticAward) {
          const base =
            typeof data.totalPoint === "number" ? data.totalPoint : 0;
          const next =
            typeof optimisticAward.total === "number"
              ? optimisticAward.total
              : base + (optimisticAward.delta ?? 0);
          data = { ...data, totalPoint: next };
        }
        setStudy(data);
      }
    } catch {}
  };

  if (loading) return <div className={style.wrap}>로딩 중...</div>;
  if (error) return <div className={style.wrap}>{error}</div>;

  const title = study?.title || "제목 없음";
  const description = study?.description || "소개가 없습니다.";

  const existingEmojis = Array.isArray(study?.emojis)
    ? study.emojis.map((e) => ({ id: e.id, emoji: e.emoji, count: e.count }))
    : [];

  const displayedPoints =
    typeof study?.totalPoint === "number"
      ? study.totalPoint
      : typeof optimisticAward?.total === "number"
        ? optimisticAward.total
        : (optimisticAward?.delta ?? 0);

  return (
    <div className={style.wrap}>
      <header>
        <nav>
          <EmojiProvider>
            <SelectEmojis
              studyId={studyId}
              existingEmojis={existingEmojis}
              onSaved={handleEmojiSaved}
            />
          </EmojiProvider>
          <ul className={style.linksWrap}>
            <li className={style.links}>공유하기</li>
            <li className={style.links} onClick={() => setIsOpen(true)}>
              수정하기
            </li>
            <li className={style.links}>스터디 삭제하기</li>
          </ul>
        </nav>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <AuthStudyContents studyId={studyId} />
        </Modal>

        <div className={style.userData}>
          <div className={style.userNav}>
            <h1>{title}</h1>

            <Link to={`/study/${studyId}/focus`} state={{ studyId }}>
              <TodayButtons className={style.userBtn} value="detail" />
            </Link>
          </div>
          <div className={style.userDetail}>
            <div className={style.userDescription}>
              <label>소개</label>
              <p>{description}</p>
            </div>

            <EarnedPoints points={displayedPoints} />
          </div>
        </div>
      </header>

      <div className={style.HabitTracker}>
        <TrackContainer studyId={studyId} />
      </div>
    </div>
  );
}

export default StudyDetailPage;
export { StudyDetailPage };
