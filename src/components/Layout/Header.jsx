import logo from '@/assets/img_logo.svg';
import styles from './Header.module.scss';

export function Header ({ actions = null }) {
    return (
        <nav>
            <div className="logo_space">
                <img src={logo} alt="Let's_study_logo"/>
                </div>
            {actions}
        </nav>
    )
}

export function CreateStudy() {
    return (
        <button className={styles.create}>스터디 만들기
        </button>
);
}