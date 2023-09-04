import React, { useEffect, useState } from "react";
import styles from "./css/fidust.module.css";
import Background from "./img/dust.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

function SmDust() {
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let week = new Array("일", "월", "화", "수", "목", "금", "토");
  let day = today.getDay(); // 요일
  let dayName = week[today.getDay()];
  const [data, setData] = useState([]);
  const API_KEY = process.env.REACT_APP_FIDUST;
  const SIDO_NANE = process.env.REACT_APP_SIDO;
  const URL = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=100&pageNo=1&sidoName=${SIDO_NANE}&ver=1.0`;

  useEffect(() => {
    axios.get(URL).then(
      // ((res)=>console.log(res.data.response.body.items[10].pm10Value))
      (res) => {
        setData(res.data.response.body.items[10].pm10Value);
      }
    );
  }, []);

  console.log(data);

  return (
    <div>
      <img src={Background} alt="미세먼지" className={styles.back__img} />
      <div className={styles.img__container}>
        <img src={Background} alt="미세먼지" className={styles.img} />
      </div>
      <div className={styles.in__container}>
        <div>
          <p>
            {year}년 {month}월 {date}일
          </p>
          <p className={styles.day}>{dayName}요일</p>
        </div>
        <div className={styles.main}>
          <p className={styles.now__dust}>광주 미세먼지(pm10) 농도는</p>
          <hr />
          <p>{data}㎍/㎥</p>
        </div>
        <Link to={`/weather`} className={styles.prebutton}>
          {">"}
        </Link>
        <Link to={`/hangang`} className={styles.backbutton}>
          {"<"}
        </Link>
      </div>
    </div>
  );
}

export default SmDust;
