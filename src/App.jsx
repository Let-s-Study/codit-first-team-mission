import './App.css'

import logoImg from './assets/img/img_logo.png';

function App() {
  const now = new Date();
  const title = "연우의 개발 공장";

  return (
    <div>
      <img src={logoImg} />
      <h1>{title}</h1>
      <div>
        <button>오늘의 집중</button>
        <button>홈</button>
      </div>
      <div>
        <h3>현재 시간</h3>
        <p>{now.toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
    </div>

  )
}

export default App
