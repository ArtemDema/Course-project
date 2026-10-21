import profileStyles from "./ProfilePage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'
import api from '../Api';

class ProfilePage extends React.Component{
  state = {details: null, }

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
  }
  render(){
    const { details } = this.state;
    return(
    <div className={profileStyles.mainDivProfilePage}>
      <Header typeOfScreen={"profile"} />
        {details && (
          <div className={profileStyles.contentDivProfilePage}>
          <div className={profileStyles.leftSide}>
            <div className={profileStyles.avatar}></div>
              <h1>{details.first_name} {details.last_name}</h1>

              <div className={profileStyles.profileInfo}>
                <h3 className={profileStyles.textInfo}>Вік: 666</h3>
                <h3 className={profileStyles.textInfo}>Місто: {details.city}</h3>
                <h3 className={profileStyles.textInfo}>Освіта: {details.education}</h3>
                <h3 className={profileStyles.textInfo}>Пошта: {details.email}</h3>
                <h3 className={profileStyles.textInfo}>Навички: Не вказано</h3>
            </div>
          </div>

          <div className={profileStyles.rightSide}>
            <h1>Про мене</h1>

            <h4>{details.about_me}</h4>
          </div>
        </div>
        )}
    </div>

  )}
}

export default ProfilePage