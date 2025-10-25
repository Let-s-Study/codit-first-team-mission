import { useEffect, useState } from "react";
import { HabitTracker } from "./HabitTracker"; // 이전에 만든 기록표 컴포넌트
import { nanoid } from 'nanoid';

export function TrackContainer() {
    const [habits, setHabits] = useState([]);
    const [records, setRecords] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
        try {
            const res = await fetch("/api/habits");
            if (!res.ok) throw new Error("서버 응답 오류");
            const data = await res.json();

            setHabits(Array.isArray(data.habits) ? data.habits : []);
            setRecords(data.records || {});
        } catch (err) {
            console.warn("⚠️ 서버 응답 실패 — mock 데이터로 대체합니다.");

            const mockHabits = [
            { id: nanoid(), text: '미라클모닝 6시 기상', isDone: true },
            { id: nanoid(), text: '아침 챙겨 먹기', isDone: true },
            { id: nanoid(), text: 'React 스터디 책 1챕터 읽기', isDone: false },
            { id: nanoid(), text: '스트레칭', isDone: false },
            { id: nanoid(), text: '영양제 챙겨 먹기', isDone: false },
            { id: nanoid(), text: '사이드 프로젝트', isDone: false },
            { id: nanoid(), text: '물 2L 먹기', isDone: false },
            ];
            const mockRecords = {
            '미라클모닝 6시 기상': [true, false, true, false, true, true, false],
            '스트레칭': [false, true, false, true, false, true, false],
            '물 2L 먹기': [true, true, true, false, true, false, false],
            };

            setHabits(mockHabits);
            setRecords(mockRecords);
        } finally {
            setIsLoading(false);
        }
        }

        fetchData();
    }, []);
    if (isLoading) return <div>로딩 중...</div>;

    if (!habits || habits.length === 0) {
        return (
        <div>
            <p>아직 습관이 없어요</p>
            <p>오늘의 습관에서 습관을 생성해보세요</p>
        </div>
        );
    }
    return (
        <HabitTracker
        habits={habits}
        records={records}
        />
    );
    }
