import React, { useEffect, useState } from "react";
import Background from "./img/testschedule.jpg";
import testschedulecss from "./css/noti.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let week = new Array("일", "월", "화", "수", "목", "금", "토");
let day = today.getDay(); // 요일
let dayName = week[today.getDay()];

const API_KEY = process.env.REACT_APP_TESTSCHEDULE;
const URL = `https://apis.data.go.kr/B490007/qualExamSchd/getQualExamSchdList?dataFormat=json&serviceKey=${API_KEY}&implYy=${year}&numOfRows=10&pageNo=1&qualgbCd=T&jmCd=6921`;

const TestSchedule = () => {
  const [testdata, setTestdata] = useState([]);
  const [rownum, setRownum] = useState(0);
  const [testnum, setTestnum] = useState("");

  useEffect(() => {
    axios.get(URL).then((res) => {
      console.log(res.data.body.items[rownum]);
      setTestdata(res.data.body.items[rownum]);
      setTestnum(res.data.body.items[rownum].description);
    });
  }, [rownum]);

  return (
    <>
      <img src={Background} alt="시험험" className={testschedulecss.back__img} />
      <div className={testschedulecss.container}>
        <img src={Background} alt="시험" className={testschedulecss.img} />
      </div>

      <div className={testschedulecss.incontainer}>
        <div>
          <p>
            {year}년 {month}월 {date}일
          </p>
          <p className={testschedulecss.day}>{dayName}요일</p>
        </div>

        <div className={testschedulecss.main}>
          <p className={testschedulecss.nowweather}>기능사 시험 일정은</p>
          <hr></hr>
          <button
            className={testschedulecss.bnts}
            onClick={() => {
              setRownum(0);
            }}
          >
            1회
          </button>
          <button
            className={testschedulecss.bnts}
            onClick={() => {
              setRownum(2);
            }}
          >
            2회
          </button>
          <button
            className={testschedulecss.bnts}
            onClick={() => {
              setRownum(3);
            }}
          >
            3회
          </button>
          <button
            className={testschedulecss.bnts}
            onClick={() => {
              setRownum(4);
            }}
          >
            4회
          </button>
          <div style={{ fontSize: "0.8rem", marginLeft: "0%" }}>
            <p>{testnum.substring(12, 22)}</p>
            <p>
              필기 신청일 : {testdata.docRegStartDt}~{testdata.docRegEndDt}
            </p>

            <p>
              필기 시험일: {testdata.docExamStartDt}~{testdata.docExamEndDt}
            </p>
            <p>
              실기 신청일 : {testdata.pracRegStartDt}~{testdata.pracRegEndDt}
            </p>
            <p>
              실기 시험일 : {testdata.pracExamStartDt}~{testdata.pracExamEndDt}
            </p>
            <p>합격자 발표일 : {testdata.pracPassDt}</p>
          </div>
        </div>
        <Link to={`/academiccalendar`} className={testschedulecss.backbutton}>
          {"<"}
        </Link>
        <Link to={`/hangang`} className={testschedulecss.prebutton}>
          {">"}
        </Link>
      </div>
    </>
  );
};

export default TestSchedule;
