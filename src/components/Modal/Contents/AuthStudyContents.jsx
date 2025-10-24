import { useEffect, useState } from "react";
import { InputSection } from "@/pages/CreateStudy/InputSection";
import { validatePassword } from "@/pages/CreateStudy/vaildators/vaildators";
import * as mock from "@/api/mock.js";

export function AuthStudyContents({ studyId, onAuthed }) {
    const [study, setStudy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setvalue] = useState({ password: "" });
    const [errors, setErrors] = useState({}); // { password?: string, server?: string }

    useEffect(function () {
        var canceled = false;
        (async function () {
        try {
            const data = await mock.getStudy(studyId);
            if (!canceled) {
            setStudy(data);
            setLoading(false);
            }
        } catch (_e) {
            if (!canceled) {
            setStudy(null);
            setLoading(false);
            }
        }
        })();
        return function () { canceled = true; };
    }, [studyId]);


    function handleChange(e) {
        var v = e && e.target && typeof e.target.value === "string" ? e.target.value : "";
        setvalue({ password: v });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        var msg = validatePassword(value.password);
        if (msg) {
        setErrors({ password: msg });
        return;
        }

        setErrors({});
        const res = await fetch("@/api/study/" + studyId + "/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: value.password }),
        });

        if (!res.ok) {
        var data = {};
        try { data = await res.json(); } catch (_e) { data = {}; }
        var serverMsg = data && typeof data.error === "string" ? data.error : "인증 실패";
        setErrors({ server: serverMsg });
        return;
        }

        if (typeof onAuthed === "function") {
        onAuthed();
        }
    }

    if (loading) return <p>로딩 중...</p>;
    if (!study) return <p>스터디를 찾을 수 없습니다.</p>;

    return (
        <div>
        <header>
            <h1>{study && typeof study.title === "string" ? study.title : ""}</h1>
            <button type="button" onClick={function(){ history.back(); }}>나가기</button>
            <p>권한이 필요해요!</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
            <InputSection
            label="비밀번호"
            name="password"
            value={typeof value.password === "string" ? value.password : ""}
            placeholder="비밀번호를 입력해 주세요"
            error={errors && errors.password ? errors.password : ""}
            onChange={handleChange}
            type="password"
            />
            {errors && errors.server ? <p className="error">{errors.server}</p> : null}
            <button type="submit">확인</button>
        </form>
        </div>
    );
}
