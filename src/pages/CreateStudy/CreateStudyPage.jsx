import style from './Create.module.scss'
import ImageImport from './ImageImport'

export function CreateStudyPage(){
    return (
        <div className={style.wrap}>
        <form>
            <h1>스터디 만들기</h1>
            <label htmlFor="nickname">닉네임</label>
            <input
                type="text"
                id="name"
                name="name"
            />

            <label htmlFor="description">소개</label>
            <input
                type="text"
                id="description"
                name="description"
            />
            
            <label htmlFor="background">배경을 선택해주세요</label>
            <ImageImport />
            <label htmlFor="password">비밀번호</label>
            <input 
                type="text"
                id="name"
                name="name"
                />
            <label htmlFor="password check">비밀번호</label>
            <input
                type="text"
                id="name"
                name="name" />
                <button>만들기</button>
        </form>
        </div>
    );
}
