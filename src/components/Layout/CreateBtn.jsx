import { Link } from 'react-router-dom';

export function CreateStudyBtn() {
    return (
        <Link to = "/create">
        <button className="create">스터디 만들기
        </button>
        </Link>
);
}