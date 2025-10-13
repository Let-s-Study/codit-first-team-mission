import react from "react";

import PointIcon from "../../../assets/ic_point.png";

function TimerHeader({}){
    return(
        <div className="wrapper">
            <div className="studyBox">
                <p>{/*api로 스터디 이름 가져오기*/}</p>
                <button type="button" className="habbitButton" onClick="location.href='../habit'" >{/* 링크추가*/}
                <p> 오늘의 습관 {'>'} </p>
                </button>
                <button type="button" className="homeButton" onClick="location.href='../home'"> {/* 링크추가*/} 
                <p> 홈 {'>'} </p>
                </button>
            </div>
            <div className="pointBox">
                <p>현재까지 획득한 포인트</p>
                <img src={PointIcon} /> <p>{/* api로 포인트 가져오기 */}P 획득 </p>
            </div>
        </div>
    )
}   