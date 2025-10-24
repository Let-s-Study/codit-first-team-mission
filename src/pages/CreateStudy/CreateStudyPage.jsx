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
    } from './vaildators/vaildators'
import { InputSection } from './InputSection'


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

        // 필드별 즉시 검증
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

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const nextErrors = validateAll(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return; // 에러 있으면 중단

        console.log("submit values:", values);

        // TODO: API 호출
        // try {
        //   const res = await fetch('/api/studies', { method:'POST', body: JSON.stringify(values) });
        // } catch (err) { ... }
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
            <button className={style.create}>만들기</button>
        </form>
        </div>
    );
}
