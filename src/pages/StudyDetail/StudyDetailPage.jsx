// import { HabitTracker } from '../HabitTracker/HabitTracker'
import { SelectEmojis } from './SelectEmojis'
import { TrackContainer } from '../HabitTracker/TrackContainer' 
import { TodayButtons } from '@/components/Buttons/TodayButtons/TodayButtons'
import { EarnedPoints } from '@/components/Points/EarnedPoints'
import { EmojiProvider } from '@/context/EmojiContext'
import { AuthStudyContents } from '@/components/Modal/Contents/AuthStudyContents'
import { Modal } from '@/components/Modal/Modal'
import { useState } from 'react'
import style from './StudyDetailPage.module.scss'

export function StudyDetailPage () {
    const [isOpen, setIsOpen] = useState(false)

    return(
    <div className={style.wrap}>
        <header>
        <nav>
            <EmojiProvider>
                <SelectEmojis/>
            </EmojiProvider>
            <ul className={style.linksWrap}>
                <li className={style.links}>공유하기</li>
                <li className={style.links} onClick={() => setIsOpen(true)}>수정하기</li>
                <li className={style.links}>스터디 삭제하기</li>
            </ul>
        </nav>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <AuthStudyContents studyId="s1"/>
                </Modal>
        <div className={style.userData}>
            <div className={style.userNav}>
                <h1>연우의 개발공장</h1>
                <TodayButtons className={style.userBtn} value="detail"/>
            </div>
            <div className={style.userDetail}>
                    <div className={style.userDescription}>
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
    )
}