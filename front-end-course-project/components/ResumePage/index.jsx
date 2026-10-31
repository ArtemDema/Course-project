import resumeStyles from "./ResumePage.module.css";
import Header from "../Header";
import React, { useState, useEffect } from 'react';
import api from '../Api';
import { useParams } from 'react-router-dom';

function ResumePage() {
  const { id } = useParams();

  const [resume, setResume] = useState({});
  const [userAbout, setUserAbout] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get(`resume/${id}`),
      api.get(`user/${id}/`)
    ])
    .then(([resumeResponse, userResponse]) => {
      setResume(resumeResponse.data);
      setUserAbout(userResponse.data);
    })
    .catch(error => {
      console.error("Ошибка:", error);
    });
  }, [id]);

  const currentAvatarSrc = resume.avatar;

  return (
    <div className={resumeStyles.mainDivResumePage}>
      <Header typeOfScreen={"main"} />
      <div className={resumeStyles.contentDivResumePage}>
        <div className={resumeStyles.rightSide}>
          <div className={resumeStyles.exampleResume}>
            <div className={resumeStyles.backLastPageDiv}>
              <div className={resumeStyles.exampleImg}></div>
              <h4>Повернутися на останню сторінку</h4>
            </div>

            <div className={resumeStyles.nameDiv}>
              <div className={resumeStyles.textFactoryName}>
                <h3>{resume.owner}</h3>
              </div>
              <div className={resumeStyles.exampleFactoryPhoto}>
                {currentAvatarSrc && (
                  <img 
                    src={`http://127.0.0.1:8000${currentAvatarSrc}`} 
                    className={resumeStyles.avatarUser}  
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                )}
              </div>
            </div>
            
            <h2>Заробітна плата: {resume.salary_price || "Не вказано"} грн.</h2>

            <div className={resumeStyles.infoDiv}>
              <h1>Розглядаю посади:</h1>
              <h3>{resume.desired_position_1}</h3>
              {resume.desired_position_2 && <h3>{resume.desired_position_2}</h3>}
              {resume.desired_position_3 && <h3>{resume.desired_position_3}</h3>}

              <h1>Особиста інформація:</h1>

              <div className={resumeStyles.profileInfo}>
                <h3 className={resumeStyles.textInfo}>Вік: 666</h3>
                <h3 className={resumeStyles.textInfo}>Місто: {userAbout?.city}</h3>
                <h3 className={resumeStyles.textInfo}>Освіта: {userAbout?.education}</h3>
                <h3 className={resumeStyles.textInfo}>Пошта: {userAbout?.email}</h3>
              </div>

              <h1>Досвід работе:</h1>
              <p>{resume.experience || "Без досвіду"}</p>
            </div>

            <button type="button" className={resumeStyles.textFactoryButton}>Перейти на сторінку</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePage;