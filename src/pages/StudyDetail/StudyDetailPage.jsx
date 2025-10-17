import { HabitTracker } from '../HabitTracker/HabitTracker';
import { TrackContainer } from '../HabitTracker/TrackContainer'
import style from './StudyDetailPage.module.scss';

export function StudyDetailPage () {
    return(
    <div className={style.wrap}>
        <header>
        <nav>
            <div className={style.emojis}>이모지</div>
            <div className={style.links}>
            <div>링크1 </div>
            <div>| 링크2</div>
            <div>| 링크3</div>
            </div>
        </nav>
        <div className={style.userData}>
            <div className={style.userTitle}>
                <h1>연우의 개발공장</h1>
                    <div className={style.userBtn}>
                    <button>오늘의 습관</button>
                    <button>오늘의 집중</button>
                </div>
                </div>

                <p>소개</p>
                <p>오늘 하루도 화이팅</p>
                <div>
                    <p>현재까지 획득한 포인트</p>
                    <div>뱃지 획득</div>
                </div>
        </div>
        </header>
        <div className={style.HabitTracker}>
        <h1>습관 기록표</h1>
        <TrackContainer/>
        </div>
    </div>
    );
}