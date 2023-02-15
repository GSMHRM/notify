import React, { useEffect, useState } from "react";
import Hangang from "../style/HanGang.module.css";
import Background from "../image/hangang.jpg";
import axios from "axios";
export default function HanGang(){

    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let week = new Array("일", "월", "화", "수", "목", "금", "토");
    let day = today.getDay(); // 요일
    let dayName = week[today.getDay()];
    
    let time = "";
    const [hangang,setHangang]=useState([{"time":"00:00","temp":"0.0"}]);
    const URL = `https://api.hangang.msub.kr/`;


    useEffect(()=>{
         axios.get(URL)
        .then((res)=>{
           setHangang(res.data);
           console.log(res.data);
         
        })
    },[])
    


    return(
        <>
      <div className={Hangang.container}>
        <img src={Background} alt="날씨" className={Hangang.img} />
      </div>

      <div className={Hangang.incontainer}>

        <div>
          <p>
            {year}년 {month}월 {date}일
          </p>
          <p className={Hangang.day}>{dayName}요일</p>
        </div>

        <div className={Hangang.main}>
          <p className={Hangang.nowweather}>{String(hangang.time).substr(0,2)}시 한강 온도는</p>
          <hr></hr>
          <p className={Hangang.temp}>{hangang.temp}°C</p>
        </div>
        
      </div>
    </>
    );
}

