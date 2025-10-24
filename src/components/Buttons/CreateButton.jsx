import { Link } from 'react-router-dom';
import style from '../Layout/Header.module.scss';
export function CreateStudyBtn() {  
return (
        <Link to = "/create">
                <button className={style.create}>스터디 만들기
                </button>
        </Link>
);
}