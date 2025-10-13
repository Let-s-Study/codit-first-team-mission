

import './App.scss'

import logoImg from './assets/img/img_logo.png';
import arrowRight from './assets/img/ic_arrow_right.png'

function App() {
  const now = new Date();
  const title = "연우의 개발 공장";

  return (
    <div className="mainContainer">
      <img src={logoImg} className="logoImg" />
      <div className="appContainer">
        <div className="headerContainer">
          <div className="titleContainer">
            <h1 className="title">{title}</h1>
          </div>
          <div className="menuContainer">
            <button>
              오늘의 집중
              <img src={arrowRight} className="arrowIcon"></img>
            </button>
            <button>
              홈
              <img src={arrowRight} className="arrowIcon"></img>
            </button>
          </div>
        </div>
        <div className="timeContainer">
          <h3>현재 시간</h3>
          <p>{now.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>


        <section className="listSection">
          <div className="listTitleSection">
            <h2>오늘의 습관</h2>
            <button>목록 수정</button>
          </div>
        </section>
      </div>
    </div>

  )
}

export default App
