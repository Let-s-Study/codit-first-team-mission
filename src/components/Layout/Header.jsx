import logo from '@/assets/img_logo.svg'
import { Link } from 'react-router-dom'

export function Header ({ actions = null }) {
    return (
        <nav>
            <Link to ="/">
            <div className="logo_space">
                <img src={logo} alt="Let's_study_logo"/>
                </div>
            </Link>
            {actions}
        </nav>
    )
}
