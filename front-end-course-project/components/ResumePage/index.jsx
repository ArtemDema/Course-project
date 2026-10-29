import resumeStyles from "./ResumePage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'
import api from '../Api';

class ResumePage extends React.Component{
  state = {
    resume: [],
    }

  componentDidMount() {
    api.get('resume/0') 
      .then(response => {
          this.setState({ resume: response.data }); 
      })
      .catch(error => {
        console.error("Ошибка:", error);
    })
  }
  render(){
    const { resume } = this.state;

    const currentAvatarSrc = resume.avatar;

    return(
      <div className={resumeStyles.mainDivProfilePage}>
      <Header typeOfScreen={"main"} />
          <div className={resumeStyles.contentDivProfilePage}>

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
                        <img src={`http://127.0.0.1:8000${currentAvatarSrc}`}   style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      )}
                    </div>
                  </div>

                  <div className={resumeStyles.infoDiv}>
                    <div className={resumeStyles.textFactory}>
                      Бажані посади: {resume.desired_position_1}
                    </div>
                    {resume.type_of_resume && <div className={resumeStyles.textFactory}>Галузь: {resume.type_of_resume}</div>}
                    
                    <div className={resumeStyles.textFactory}>Досвід роботи: {resume.experience || "Без досвіду"}</div>
                    <div className={resumeStyles.textFactory}>Заробітна плата: {resume.salary_price || "Не вказано"} грн.</div>
                  </div>

                  <button type="button" className={resumeStyles.textFactoryButton}>Показати більше</button>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default ResumePage