import { useEffect, useState } from "react";
import { HabitTracker } from "./HabitTracker"; // 이전에 만든 기록표 컴포넌트
<<<<<<< HEAD
=======
import { nanoid } from 'nanoid';
>>>>>>> be31ce0a5d06fc2bb312c5bab1932443d6d7a338

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
<<<<<<< HEAD
            { id: "wake6", name: "미라클모닝 6시 기상" },
            { id: "stretch", name: "스트레칭" },
            { id: "water", name: "물 2L 마시기" },
            { id: "d", name: "물 2Lasd 마시기" },
            { id: "wddater", name: "물 2L asd마시기" },
            { id: "watdder", name: "물 2L 마asd시기" },

            ];
            const mockR ecords = {
=======
            { id: nanoid(), text: '미라클모닝 6시 기상', isDone: true },
            { id: nanoid(), text: '아침 챙겨 먹기', isDone: true },
            { id: nanoid(), text: 'React 스터디 책 1챕터 읽기', isDone: false },
            { id: nanoid(), text: '스트레칭', isDone: false },
            { id: nanoid(), text: '영양제 챙겨 먹기', isDone: false },
            { id: nanoid(), text: '사이드 프로젝트', isDone: false },
            { id: nanoid(), text: '물 2L 먹기', isDone: false },
            ];
            const mockRecords = {
>>>>>>> be31ce0a5d06fc2bb312c5bab1932443d6d7a338
            wake6: [true, false, true, false, false, true, false],
            stretch: [false, true, false, false, false, false, false],
            water: [true, true, true, false, false, false, false],
            d: [true, true, true, false, false, false, false],
            wddater: [true, true, true, false, false, false, false]
            };

            setHabits(mockHabits);
            setRecords(mockRecords);
        } finally {
            setIsLoading(false);
        }
        }

        fetchData();
    }, []);

    const handleToggle = (habitId, dayIdx) => {
        setRecords((prev) => {
        const next = { ...prev };
        const row = [...(next[habitId] || Array(7).fill(false))];
        row[dayIdx] = !row[dayIdx];
        next[habitId] = row;
        return next;
        });
    };

    if (isLoading) return <div>로딩 중...</div>;

    if (!habits || habits.length === 0) {
        return (
        <div>
            <p>아직 습관이 없어요</p>
            <p>오늘의 습관에서 습관을 생성해보세요</p>
        </div>
        );
    }
    // 정상 렌더
    return (
        <HabitTracker
        habits={habits}
        records={records}
        onToggle={handleToggle}
        />
    );
    }
