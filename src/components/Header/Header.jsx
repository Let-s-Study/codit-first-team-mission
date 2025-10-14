import logo from '../../assets/img/img_logo.svg'
import styles from './Header.module.scss'

export function Header({ actions = null }) {
  return (
    <nav>
      <div className="logo_space">
        <img src={logo} alt="Let's_study_logo" />
      </div>
      {actions}
    </nav>
  )
}