import axios from "axios";
import React, { useEffect, useState } from "react";
import Background from "./img/academic.jpg";
import styles from "./css/fidust.module.css";
import { Link } from "react-router-dom";

let today = new Date();
let year = today.getFullYear(); // 년도
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let date = ("0" + today.getDate()).slice(-2);
let week = new Array("일", "월", "화", "수", "목", "금", "토");
let day = today.getDay(); // 요일
let dayName = week[today.getDay()];

const API_KEY = "eec42ae7144a47898d823c55a82a1729";
const ATPT_OFCDC_SC_CODE = "F10";
const SD_SCHUL_CODE = "7380292";
let TODAY = year + month;

const URL = `	https://open.neis.go.kr/hub/SchoolSchedule?Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&AA_YMD=${TODAY}`;

const Academiccalendar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(URL).then((res) => {
      console.log(res.data.SchoolSchedule[1].row);
      setData(res.data.SchoolSchedule[1].row);
    });
  }, []);

  return (
    <>
      <img src={Background} alt="책" className={styles.back__img} />
      <div className={styles.img__container}>
        <img src={Background} alt="책" className={styles.img} />
      </div>
      <div className={styles.in__container}>
        <div>
          <p>
            {year}년 {month}월 {date}일
          </p>
          <p className={styles.day}>{dayName}요일</p>
        </div>
        <div className={styles.main}>
          <p className={styles.now__dust}>이번달 학사 일정은</p>
          <hr />
          {data.map((eventnm, index) => (
            <p key={index} style={{ fontSize: "1rem" }}>
              {eventnm.EVENT_NM}({eventnm.AA_YMD})
            </p>
          ))}
        </div>
        <Link to={`/hangang`} className={styles.prebutton}>
          {">"}
        </Link>
        <Link to={`/`} className={styles.backbutton}>
          {"<"}
        </Link>
      </div>
    </>
  );
};

export default Academiccalendar;