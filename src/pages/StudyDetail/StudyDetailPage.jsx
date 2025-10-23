// import { HabitTracker } from '../HabitTracker/HabitTracker';
import { SelectEmojis } from './SelectEmojis';
import { TrackContainer } from '../HabitTracker/TrackContainer' 
import style from './StudyDetailPage.module.scss';
import { TodayButtons } from '@/components/Buttons/TodayButtons/TodayButtons';
import { EarnedPoints } from '@/components/Points/EarnedPoints';
import { EmojiProvider } from '../../context/EmojiContext';
// import { Modal } from '@/components/Modal/Modal';

export function StudyDetailPage () {
    
    return(
    <div className={style.wrap}>
        <header>
        <nav>
            <EmojiProvider>
                <SelectEmojis/>
            </EmojiProvider>
            <ul className={style.linksWrap}>
                <li className={style.links}>공유하기</li>
                <li className={style.links} >수정하기</li>
                <li className={style.links}>스터디 삭제하기 </li>
            </ul>
        </nav>
        <div className={style.userData}>
            <div className={style.userNav}>
                <h1>연우의 개발공장</h1>
                <TodayButtons className={style.userBtn} value="detail"/>
                </div>
            <div className={style.userDetail}>
                    <div clasName={style.userDescription}>
                        <label>소개</label>
                        <p>오늘 하루도 화이팅</p>
                    </div>
                    <EarnedPoints />
                </div>
        </div>
        </header>
        <div className={style.HabitTracker}>
        <TrackContainer/>
        </div>
    </div>
    );
}