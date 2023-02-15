import React, { useEffect, useState } from 'react';
import styles from "./css/fidust.module.css";
import Background from "./img/dust.png";
import axios from 'axios';

function SmDust() {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let week = new Array("일", "월", "화", "수", "목", "금", "토");
    let day = today.getDay(); // 요일
    let dayName = week[today.getDay()];
    const [data, setData]=useState([]);
    const API_KEY=process.env.REACT_APP_API_KEY;
    const URL=`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=SmhbNZHl1Nogk0i9B2hiUjvqkJxPKYbROW789SRPplSUfeNFWQUyJ0IUplBaZXtKgO3Gt37CrKnUEcVmc2aVUg%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B4%91%EC%A3%BC&ver=1.0`;

    useEffect(()=>{
        axios.get(URL).then(
            // ((res)=>console.log(res.data.response.body.items[10].pm10Value))
            ((res)=>{setData(res.data.response.body.items[10].pm10Value)})
        );
    },[]);

    console.log(data);

    return (
        <div>
            <div className={styles.img__container}>
                <img src={Background} alt="미세먼지" className={styles.img} />
            </div>
            <div className={styles.in__container}>
                <div>
                    <p>{year}년 {month}월 {date}일</p> 
                    <p className={styles.day}>{dayName}요일</p>
                </div>
                <div className={styles.main}>
                    <p className={styles.now__dust}>오늘의 미세먼지 농도는</p>
                    <hr />
                    <p>{data}㎍/㎥</p>
                </div>
            </div>
        </div>
    );
}

export default SmDust;