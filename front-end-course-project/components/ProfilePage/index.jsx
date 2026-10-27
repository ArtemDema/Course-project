import profileStyles from "./ProfilePage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'
import api from '../Api';

class ProfilePage extends React.Component{
  state = {
    details: null,
    resume: [],
    imagePreview: null
   }

  componentDidMount() {
    api.get('user/me/') 
      .then(responce => {
        this.setState({
          details: responce.data
        });
      })
      .catch(error => {
        console.log("Ошибка получения профиля:", error);
      });

    api.get('resume/') 
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

    const myResume = details && resume.length > 0
      ? resume.find(r => r.owner_id === details.id || r.user === details.id || r.user_id === details.id) : null;
    return(
    <div className={profileStyles.mainDivProfilePage}>
      <Header typeOfScreen={"profile"} />
        {details && (
          <div className={profileStyles.contentDivProfilePage}>
          <div className={profileStyles.leftSide}>
            <div className={profileStyles.avatar}>
              {currentAvatarSrc && (
                <img src={currentAvatarSrc}  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                />
              )}
            </div>
              <h1>{details.first_name} {details.last_name}</h1>

              <div className={profileStyles.profileInfo}>
                <h3 className={profileStyles.textInfo}>Вік: 666</h3>
                <h3 className={profileStyles.textInfo}>Місто: {details.city}</h3>
                <h3 className={profileStyles.textInfo}>Освіта: {details.education}</h3>
                <h3 className={profileStyles.textInfo}>Пошта: {details.email}</h3>
            </div>
          </div>

          <div className={profileStyles.rightSide}>
            <h1>Про мене</h1>

            <h4>{details.about_me}</h4>

            {myResume ? (
              <div className={profileStyles.exampleResume}>
                <div className={profileStyles.nameDiv}>
                  <div className={profileStyles.textFactoryName}>
                    <h3>{myResume.owner}</h3>
                  </div>
                  <div className={profileStyles.exampleFactoryPhoto}>
                    {currentAvatarSrc && (
                      <img src={currentAvatarSrc}  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    )}
                  </div>
                </div>

                <div className={profileStyles.infoDiv}>
                  <div className={profileStyles.textFactory}>
                    Бажані посади: {myResume.desired_position_1}
                  </div>
                  {myResume.type_of_resume && <div className={profileStyles.textFactory}>Галузь: {myResume.type_of_resume}</div>}
                  
                  <div className={profileStyles.textFactory}>Досвід роботи: {myResume.experience || "Без досвіду"}</div>
                  <div className={profileStyles.textFactory}>Заробітна плата: {myResume.salary_price || "Не вказано"} грн.</div>
                </div>

                <button type="button" className={profileStyles.textFactoryButton}>Показати більше</button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        )}
    </div>

  )}
}

export default ProfilePage