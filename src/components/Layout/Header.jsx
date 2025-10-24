import logo from '@/assets/img_logo.svg'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export function Header ({ actions = null }) {
    return (
        <div className={styles.Header}>
        <nav>
            <Link to ="/">
            <div className={styles.logoSpace}>
                <img src={logo} alt="Let's_study_logo"/>
                </div>
            </Link>
            {actions}
        </nav>
        </div>
    )
}
