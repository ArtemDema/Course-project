import vacancyStyles from "./VacancyPage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'
import api from '../Api';

class VacancyPage extends React.Component{
  state = {
    details: null,
    resume: [],
    imagePreview: null
   }

  componentDidMount() {
    api.get('resume/1') 
      .then(response => {
        console.log(response.data);
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          this.setState({ resume: Array.isArray(response.data) ? response.data : [] }); 
        } else {
          this.setState({ resume: [] });
        }
      })
      .catch(error => {
        console.error("Ошибка:", error);
    })
  }
  render(){
    const { details, resume, imagePreview } = this.state;

    const currentAvatarSrc = imagePreview || (details && details.avatar);

    <div className={vacancyStyles.mainDivProfilePage}>
      <Header typeOfScreen={"profile"} />
          <div className={vacancyStyles.contentDivProfilePage}>

            <div className={vacancyStyles.rightSide}>
                <div className={vacancyStyles.exampleResume}>
                  <div className={vacancyStyles.nameDiv}>
                    <div className={vacancyStyles.textFactoryName}>
                      <h3>{myResume.owner}</h3>
                    </div>
                    <div className={vacancyStyles.exampleFactoryPhoto}>
                      {currentAvatarSrc && (
                        <img src={currentAvatarSrc}  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      )}
                    </div>
                  </div>

                  <div className={vacancyStyles.infoDiv}>
                    <div className={vacancyStyles.textFactory}>
                      Бажані посади: {resume.desired_position_1}
                    </div>
                    {resume.type_of_resume && <div className={vacancyStyles.textFactory}>Галузь: {resume.type_of_resume}</div>}
                    
                    <div className={vacancyStyles.textFactory}>Досвід роботи: {resume.experience || "Без досвіду"}</div>
                    <div className={vacancyStyles.textFactory}>Заробітна плата: {resume.salary_price || "Не вказано"} грн.</div>
                  </div>

                  <button type="button" className={vacancyStyles.textFactoryButton}>Показати більше</button>
                </div>
            </div>
        </div>
    </div>
  }
}

export default VacancyPage