import style from './Create.module.scss'
import { BackgroundSelect } from './BackgroundSelect.jsx'
import { useState } from 'react'

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

    const handleValue = (e) => {
        const {name, value} = e.target;
        setValues((prev) => ({
            ...prev,
            [name] : value,
        }))
    }

    const handleBgChange = (id) => {
        setValues((prev) => ({...prev, backgroundId: id }));
        console.log('changed', id);
    
    };

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
                placeholder='닉네임을 입력해 주세요'
            />
            <input
                name="title" 
                value={values.title} 
                onChange={handleValue}
                placeholder='스터디 이름을 입력해 주세요'
            />
            <label htmlFor="description">소개</label>
            <input
                name="description" 
                value={values.description} 
                onChange={handleValue}
                placeholder='소개 멘트를 작성해 주세요'
            />

            <label htmlFor="background">배경을 선택해주세요</label>
            <BackgroundSelect 
                items={ITEMS}
                value={values.backgroundId} 
                onChange={handleBgChange}
            />
            <label htmlFor="password">비밀번호</label>
            <input 
                name="password" 
                value={values.password} 
                onChange={handleValue}
                placeholder='비밀번호를 입력해 주세요'
                />
            <label htmlFor="passwordCheck">비밀번호</label>
            <input
                name="passwordCheck" 
                value={values.passwordCheck} 
                onChange={handleValue}
                placeholder='비밀번호를 다시 한 번 입력해 주세요'
                />
                <button type="submit" className={style.create}>만들기</button>
        </form>
        </div>
    );
}
