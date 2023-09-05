import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cafe from "./css/noti.module.css";
import cafeteriaimg from "./img/cafeteria.jpg";

const API_KEY = process.env.REACT_APP_NEIS;
const ATPT_OFCDC_SC_CODE = process.env.REACT_APP_SCCODE;
const SD_SCHUL_CODE = process.env.REACT_APP_SDCODE;

const Cafeteria = () => {
  const [kal, setKal] = useState("");
  const [eat, setEat] = useState("");
  const [info, setInfo] = useState("");
  const [rownum, setRownum] = useState(0);
  const [cafeday, setCafeday] = useState("아침");
  const [currentDate, setCurrentDate] = useState(new Date());

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
  };

  const handlePrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${getFormattedDate(
    currentDate
  )}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setKal(res.data.mealServiceDietInfo[1].row[rownum].CAL_INFO);
        setInfo(res.data.mealServiceDietInfo[1].row[rownum].NTR_INFO);
        setEat(res.data.mealServiceDietInfo[1].row[rownum].DDISH_NM);
      })
      .catch((err) => {
        setEat("급식이 없어요");
      });
  }, [URL, rownum]);

  const replaceWithBr = useCallback(() => {
    return eat.replace(/[0-9,.()]/g, "");
  }, [eat]);

  const replaceWithBrInfo = useCallback(() => {
    return info.replace(/[,()]/g, "");
  }, [info]);

  return (
    <>
      <img src={cafeteriaimg} alt="미세먼지" className={cafe.back__img} />
      <div className={cafe.container}>
        <img src={cafeteriaimg} alt="날씨" className={cafe.img} />
      </div>

      <div className={cafe.incontainer}>
        <div>
          <p>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{" "}
            {currentDate.getDate()}일
          </p>
          <p className={cafe.day}>
            {["일", "월", "화", "수", "목", "금", "토"][currentDate.getDay()]}
            요일
          </p>
        </div>

        <div style={{ margin: 0 }}>
          <button
            className={cafe.button}
            style={{ cursor: "pointer" }}
            onClick={handlePrevDay}
          >
            어제
          </button>
          <button
            className={cafe.button}
            style={{ cursor: "pointer" }}
            onClick={handleNextDay}
          >
            내일
          </button>
        </div>

        <div className={cafe.cafeteriamain}>
          <p className={cafe.nowweather}>오늘 {cafeday}은</p>
          <hr />
          <button
            className={cafe.button}
            onClick={() => {
              setRownum(0);
              setCafeday("아침");
            }}
          >
            아침
          </button>
          <button
            className={cafe.button}
            onClick={() => {
              setRownum(1);
              setCafeday("점심");
            }}
          >
            점심
          </button>
          <button
            className={cafe.button}
            onClick={() => {
              setRownum(2);
              setCafeday("저녁");
            }}
          >
            저녁
          </button>
          <p
            style={{ fontSize: "1rem" }}
            dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
          />
          <p style={{ fontSize: "0.6rem" }}>{kal}</p>
          <p
            style={{ fontSize: "0.6rem" }}
            dangerouslySetInnerHTML={{ __html: replaceWithBrInfo() }}
          />
        </div>

        <Link to={`/academiccalendar`} className={cafe.prebutton}>
          {">"}
        </Link>
      </div>
    </>
  );
};

export default Cafeteria;
