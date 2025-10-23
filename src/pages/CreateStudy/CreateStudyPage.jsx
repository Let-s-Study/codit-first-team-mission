import style from './CreateStudyPage.module.scss'
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
    const [errors, setErrors] = useState({});
    //   const navigate = useNavigate();

    const validateName = (value) => {
        if (value.length < 2 || value.length > 10) {
        setErrors((prev) => ({
            ...prev,
            name: "2자 이상 10자 이내로 입력해주세요",
        }));
        } else {
        setErrors((prev) => ({ ...prev, name: undefined }));
        }
    };

    const validateDescription = (value) => {
        if (value.length < 10) {
        setErrors((prev) => ({
            ...prev,
            description: "10자 이상 입력해주세요.",
        }));
        } else {
        setErrors((prev) => ({ ...prev, description: undefined }));
        }
    };

    const vaildPassword = (value) => {
        if (!/^\d+$/.test(value)) {
        setErrors((prev) => ({ ...prev, price: "숫자로 입력해주세요." }));
        } else {
        setErrors((prev) => ({ ...prev, price: undefined }));
        }
    };

    const handleBgChange = (id) => {
        setValues((prev) => ({...prev, backgroundId: id }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(values);
    }

        const handleValue = (e) => {
        const {name, value} = e.target;
        setValues((prev) => ({
            ...prev,
            [name] : value,
        }))
    }
    
    const [values, setValues] = useState ({
        nickName: '',
        title:'',
        description: '',
        backgroundId: '',
        password:'',
        passwordCheck:'',
    });
//     try {
//       const result = await addProduct(values); // API 호출
//       console.log("상품 등록 성공:", result);
//       navigate(`/items/${result.id}`);
//     } catch (error) {
//       console.error("상품 등록 실패:", error);
//     }
//   };
    return (
        <div className={style.wrap}>
        <form onSubmit={handleSubmit}>
            <h1 className={style.title}>스터디 만들기</h1>
            <label htmlFor="nickName" className={style.label}>닉네임</label>
            <input
                name="nickName" 
                value={values.nickName} 
                onChange={(e)=>{
                    handleValue(e);
                    validateName(e.target.value);
                }}
                placeholder='닉네임을 입력해 주세요'
                error={errors.name} // 에러 메시지 전달 
            />
            <label htmlFor="title" className={style.label}>스터디 이름</label>
            <input
                name="title" 
                value={values.title} 
                onChange={(e)=>{
                    handleValue(e)
                    validateName(e.target.value);
                }}
                placeholder='스터디 이름을 입력해 주세요'
                error={errors.name} // 에러 메시지 전달
            />
            <label htmlFor="description" className={style.label}>소개</label>
            <input
                name="description" 
                value={values.description} 
                onChange={(e)=>{
                    handleValue(e)
                    validateDescription(e.target.value);
                }}
                placeholder='소개 멘트를 작성해 주세요'
                error={errors.name} // 에러 메시지 전달
            />

            <label htmlFor="background" className={style.label}>배경을 선택해주세요</label>
            <BackgroundSelect 
                items={ITEMS}
                value={values.backgroundId} 
                onChange={handleBgChange}
                error={errors.name} // 에러 메시지 전달
            />
            <label htmlFor="password"className={style.label}>비밀번호</label>
            <input 
                name="password" 
                value={values.password} 
                onChange={(e)=>{
                    handleValue(e);
                    vaildPassword(e.target.value);
                }}
                placeholder='비밀번호를 입력해 주세요'
                error={errors.name} // 에러 메시지 전달
            />
            <label htmlFor="passwordCheck"className={style.label}>비밀번호</label>
            <input
                name="passwordCheck" 
                value={values.passwordCheck} 
                onChange={(e)=>{
                    handleValue
                    vaildPasswordCheck(e.target.value);
                }}
                placeholder='비밀번호를 다시 한 번 입력해 주세요'
                error={errors.name} // 에러 메시지 전달            
                />
                <button className={style.create}>만들기</button>
        </form>
        </div>
    );
}
