import vacancyStyles from "./VacancyPage.module.css";
import Header from "../Header";
import React, { useState, useEffect } from 'react';
import { publicApi } from '../Api';
import { useParams } from 'react-router-dom';

function VacancyPage() {
  const { id } = useParams();

  const [vacancy, setVacancy] = useState({});

  useEffect(() => {
    publicApi.get(`vacancy/${id}`)
      .then((vacancyResponse) => {
        setVacancy(vacancyResponse.data);
      })
      .catch(error => {
        console.error("Ошибка:", error);
      });
    }, [id]);

  const currentAvatarSrc = vacancy.avatar;

  return (
    <div className={vacancyStyles.mainDivVacancyPage}>
      <Header typeOfScreen={"main"} />
      <div className={vacancyStyles.contentDivVacancyPage}>
        <div className={vacancyStyles.rightSide}>
          <div className={vacancyStyles.exampleVacancy}>
            <div className={vacancyStyles.backLastPageDiv}>
              <div className={vacancyStyles.exampleImg}></div>
              {/* <h4>Повернутися на останню сторінку</h4> */}
            </div>

            <div className={vacancyStyles.nameDiv}>
              <div className={vacancyStyles.textFactoryName}>
                <h3>{vacancy.name}</h3>
              </div>
              <h1>{vacancy.desired_position}</h1>
            </div>

            <div className={vacancyStyles.infoDiv}>
              <h2>Заробітна плата: {vacancy.salary_price || "Не вказано"} грн.</h2>
              <h1>Про вакансію:</h1>
              <p>{vacancy.experience || "Без досвіду"}</p>

              <h1>Контакти:</h1>
              <p>{vacancy.contacts || "Не вказано"}</p>
            </div>

            <button type="button" className={vacancyStyles.textFactoryButton}>Перейти на сторінку</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VacancyPage;