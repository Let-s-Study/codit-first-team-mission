import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HabitTracker } from "./HabitTracker";
import { nanoid } from "nanoid";
import apiClient from "@/api/client";

export function TrackContainer({ studyId: propStudyId }) {
  const params = useParams();
  const studyId = propStudyId ?? params.studyId;

  const [habits, setHabits] = useState([]);
  const [records, setRecords] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      if (!studyId) {
        if (!ignore) {
          setHabits([]);
          setRecords({});
          setErr("studyId가 없어 습관 데이터를 불러올 수 없습니다.");
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setErr("");

        const id = encodeURIComponent(studyId);
        let res;

        try {
          res = await apiClient.get(`/studies/${id}/habits`);
        } catch (e1) {
          console.warn(
            `[TrackContainer] /studies/${id}/habits 실패 → /habits?studyId=${id} 재시도`
          );
          res = await apiClient.get(`/habits`, { params: { studyId } });
        }

        const payload = res?.data?.data ?? res?.data ?? null;

        let nextHabits = [];
        let nextRecords = {};

        if (Array.isArray(payload)) {
          nextHabits = payload;
        } else if (payload && typeof payload === "object") {
          if (Array.isArray(payload.habits)) nextHabits = payload.habits;
          if (payload.records && typeof payload.records === "object")
            nextRecords = payload.records;
        }

        nextHabits = Array.isArray(nextHabits) ? nextHabits : [];
        nextRecords =
          nextRecords && typeof nextRecords === "object" ? nextRecords : {};

        if (!ignore) {
          setHabits(nextHabits);
          setRecords(nextRecords);
        }
      } catch (e) {
        console.warn("⚠️ 서버 응답 실패 — mock 데이터로 대체합니다.", e);
        if (!ignore) {
          const mockHabits = [
            { id: nanoid(), text: "미라클모닝 6시 기상", isDone: true },
            { id: nanoid(), text: "아침 챙겨 먹기", isDone: true },
            { id: nanoid(), text: "React 스터디 책 1챕터 읽기", isDone: false },
            { id: nanoid(), text: "스트레칭", isDone: false },
            { id: nanoid(), text: "영양제 챙겨 먹기", isDone: false },
            { id: nanoid(), text: "사이드 프로젝트", isDone: false },
            { id: nanoid(), text: "물 2L 먹기", isDone: false },
          ];
          const mockRecords = {
            "미라클모닝 6시 기상": [
              true,
              false,
              true,
              false,
              true,
              true,
              false,
            ],
            스트레칭: [false, true, false, true, false, true, false],
            "물 2L 먹기": [true, true, true, false, true, false, false],
          };
          setHabits(mockHabits);
          setRecords(mockRecords);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [studyId]);

  if (isLoading) return <div>로딩 중...</div>;

  if (err) {
    return (
      <div>
        <p>{err}</p>
      </div>
    );
  }

  if (!habits || habits.length === 0) {
    return (
      <div>
        <p>아직 습관이 없어요</p>
        <p>오늘의 습관에서 습관을 생성해보세요</p>
      </div>
    );
  }

  return <HabitTracker habits={habits} records={records} />;
}

export default TrackContainer;
