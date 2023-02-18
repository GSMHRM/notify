import React, { useEffect, useState } from "react";
import Background from "./img/testschedule.jpg";
import weathercss from "./css/noti.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let week = new Array("일", "월", "화", "수", "목", "금", "토");
let day = today.getDay(); // 요일
let dayName = week[today.getDay()];

const API_KEY =
  "SmhbNZHl1Nogk0i9B2hiUjvqkJxPKYbROW789SRPplSUfeNFWQUyJ0IUplBaZXtKgO3Gt37CrKnUEcVmc2aVUg%3D%3D";
const URL = `http://apis.data.go.kr/B490007/qualExamSchd/getQualExamSchdList?dataFormat=json&serviceKey=${API_KEY}&implYy=${year}&numOfRows=10&pageNo=1&qualgbCd=T&jmCd=6921`;

const TestSchedule = () => {
  const [testdata, setTestdata] = useState([]);

  useEffect(() => {
    axios.get(URL).then((res) => {
      console.log(res.data.body.items);
      setTestdata(res.data.body.items);
    });
  }, []);

  console.log(testdata);

  return (
    <>
      <img src={Background} alt="시험험" className={weathercss.back__img} />
      <div className={weathercss.container}>
        <img src={Background} alt="시험" className={weathercss.img} />
      </div>

      <div className={weathercss.incontainer}>
        <div>
          <p>
            {year}년 {month}월 {date}일
          </p>
          <p className={weathercss.day}>{dayName}요일</p>
        </div>

        <div className={weathercss.main}>
          <p className={weathercss.nowweather}>{year}년 기능사 시험 일정은</p>
          <hr></hr>
          {testdata.map((info, index) => (
            <p key={index} style={{ fontSize: "0.7rem" }}>
              {info.description.substring(12,22)}<br/>
              필기 신청 : {info.docRegStartDt}~{info.docRegEndDt}
              <br />
              실기 신청 : {info.pracRegStartDt}~{info.pracRegEndDt}
              <br />
              합격자 발표 : {info.pracPassDt}
            </p>
          ))}
        </div>
        <Link to={`/academiccalendar`} className={weathercss.backbutton}>
          {"<"}
        </Link>
        <Link to={`/hangang`} className={weathercss.prebutton}>
          {">"}
        </Link>
      </div>
    </>
  );
};

export default TestSchedule;
