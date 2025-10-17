import style from './Create.module.scss'
import { BackgroundSelect } from './BackgroundSelect.jsx'
import { useState } from 'react'


const ITEMS = [
    { id: "c1", type: "color", value: "#E3F0DF" },
    { id: "c2", type: "color", value: "#FFEFB3" },
    { id: "c3", type: "color", value: "#DDF1F7" },
    { id: "c4", type: "color", value: "#FBD1E2" },
    { id: "i1", type: "img", value: "/img/desk1.jpg" },
    { id: "i2", type: "img", value: "/img/desk2.jpg" },
    { id: "i3", type: "img", value: "/img/tiles.jpg" },
    { id: "i4", type: "img", value: "/img/leaf.jpg" },
    ];


export function CreateStudyPage(){

    const [values, setValues] = useState ({
        nickName: '',
        description: '',
        backgroundId: '',
        password:'',
        passwordCheck:'',
    });

    const handleValue = (e) => {
        const {name, value} = e.target;
        setValues((prev) => ({
            ...prev,
            [name] : value,
        }))
    }

    const handleBgChange = (id) => {
        setValues((prev) => ({...prev, bg: id }))};

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(values);
    }

    return (
        <div className={style.wrap}>
        <form onSubmit={handleSubmit}>
            <h1>스터디 만들기</h1>
            <label htmlFor="nickName">닉네임</label>
            <input
                name="nickName" 
                value={values.nickName} 
                onChange={handleValue}
            />

            <label htmlFor="description">소개</label>
            <input
                name="description" 
                value={values.description} 
                onChange={handleValue}
            />

            <label htmlFor="background">배경을 선택해주세요</label>
            <BackgroundSelect 
                items={ITEMS}
                value={values.backgroundId} 
                onChange={handleBgChange}
            />
            <label htmlFor="password">비밀번호</label>
            <input 
                name="password" value={values.password} onChange={handleValue}
                />
            <label htmlFor="passwordCheck">비밀번호</label>
            <input
                name="passwordCheck" value={values.passwordCheck} onChange={handleValue}
                />
                <button type="submit">만들기</button>
        </form>
        </div>
    );
}
