import style from './CreateStudyPage.module.scss'
import { BackgroundSelect } from './BackgroundSelect.jsx'
import { useState } from 'react'
import {
    validateNickName,
    validateTitle,
    validateDescription,
    validateBackgroundId,
    validatePassword,
    validatePasswordCheck,
    validateAll,
    } from './validators/validators'
import { InputSection } from './InputSection'
import apiClient from "@/api/client";
import { useNavigate } from 'react-router-dom';

console.info("[api] baseURL =", apiClient.defaults.baseURL);
import sampleImg1 from '@/assets/samples/sample_img.jpg'
import sampleImg2 from '@/assets/samples/sample_img2.jpg'
import sampleImg3 from '@/assets/samples/sample_img3.jpg'
import sampleImg4 from '@/assets/samples/sample_img4.jpg'

const ITEMS = [
    { id: "c1", type: "color", value: "#E3F0DF" },
    { id: "c2", type: "color", value: "#FFEFB3" },
    { id: "c3", type: "color", value: "#DDF1F7" },
    { id: "c4", type: "color", value: "#FBD1E2" },
    { id: "i1", type: "img", value: sampleImg1 },
    { id: "i2", type: "img", value: sampleImg2 },
    { id: "i3", type: "img", value: sampleImg3 },
    { id: "i4", type: "img", value: sampleImg4 },
    ];

export function CreateStudyPage(){
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");

    const [values, setValues] = useState ({
        nickName: '',
        title:'',
        description: '',
        backgroundId: '',
        password:'',
        passwordCheck:'',
    });
    const [errors, setErrors] = useState({});
    const setField = (name, value) => {
            setValues((prev) => ({ ...prev, [name]: value }));
        };

    const handleValue = (e) => {
        const { name, value } = e.target;
        setField(name, value);
        let msg = "";
            if (name === "nickName") msg = validateNickName(value);
            if (name === "title") msg = validateTitle(value);
            if (name === "description") msg = validateDescription(value);
            if (name === "password") msg = validatePassword(value);
            if (name === "passwordCheck") msg = validatePasswordCheck(values.password, value);
        setErrors((prev) => ({ ...prev, [name]: msg }));
    };

    const handleBgChange = (id) => {
        setField("backgroundId", id);
        const msg = validateBackgroundId(id);
        setErrors((prev) => ({ ...prev, backgroundId: msg }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    setServerError("");

    try {
        console.log("[POST] values:", values);
        const res = await apiClient.post("/studies", values);
        console.log("[POST] response:", res.status, res.data);
        const created = res.data;
        alert("스터디가 성공적으로 만들어졌어요!");
        navigate(`/study/${created.id}`);
    } catch (err) {
        console.error("[POST] error:", err);
        const msg =
        err.response && err.response.data && err.response.data.error
            ? err.response.data.error
            : "서버 오류가 발생했습니다.";
        alert(msg);
    } finally {
        setIsSubmitting(false);
    }
    };
    return (
        <div className={style.wrap}>
        <form onSubmit={handleSubmit} noValidate>
            <h1 className={style.title}>스터디 만들기</h1>
            <InputSection
                label="닉네임"
                name="nickName"
                value={values.nickName}
                onChange={handleValue}
                placeholder="닉네임을 입력해 주세요"
                error={errors.nickName}
            />
            <InputSection
                label="스터디 이름"
                name="title"
                value={values.title}
                onChange={handleValue}
                placeholder="스터디 이름을 입력해 주세요"
                error={errors.title}
            />
            <InputSection
                label="소개"            
                name="description"
                value={values.description}
                onChange={handleValue}
                placeholder="소개 멘트를 작성해 주세요"
                error={errors.description}
                isTextArea
            />
            <BackgroundSelect
                label="배경선택"
                items={ITEMS}
                value={values.backgroundId}
                onChange={handleBgChange}
                error={errors.backgroundId}
            />
            <InputSection
                label="비밀번호"  
                name="password"
                value={values.password}
                onChange={handleValue}
                placeholder="비밀번호를 입력해 주세요"
                error={errors.password}
            />
            <InputSection
                label="비밀번호 확인"
                name="passwordCheck"
                type="password"
                value={values.passwordCheck}
                onChange={handleValue}
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                error={errors.passwordCheck}
            />
            <button type='submit' className={style.create}>만들기</button>
        </form>
        </div>
    );
}
