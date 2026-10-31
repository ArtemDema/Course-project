import vacancyStyles from "./VacancyPage.module.css";
import Header from "../Header";
import React, { useState, useEffect } from 'react';
import api from '../Api';
import { useParams } from 'react-router-dom';

function VacancyPage() {
  const { id } = useParams();

  const [vacancy, setVacancy] = useState({});

  useEffect(() => {
    api.get(`vacancy/${id}`)
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
              <h4>Повернутися на останню сторінку</h4>
            </div>

            <div className={vacancyStyles.nameDiv}>
              <div className={vacancyStyles.textFactoryName}>
                <h3>{vacancy.owner}</h3>
              </div>
              <div className={vacancyStyles.exampleFactoryPhoto}>
                {currentAvatarSrc && (
                  <img 
                    src={`http://127.0.0.1:8000${currentAvatarSrc}`} 
                    className={vacancyStyles.avatarUser}  
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                )}
              </div>
            </div>
            
            <h2>Заробітна плата: {vacancy.salary_price || "Не вказано"} грн.</h2>

            <div className={vacancyStyles.infoDiv}>
              <h1>Розглядаю посади:</h1>
              <h3>{vacancy.desired_position}</h3>

              <h1>Досвід работе:</h1>
              <p>{vacancy.experience || "Без досвіду"}</p>
            </div>

            <button type="button" className={vacancyStyles.textFactoryButton}>Перейти на сторінку</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VacancyPage;