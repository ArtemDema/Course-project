import editProfileStyles from "./EditProfilePage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class EditProfilePage extends React.Component{
  state = {details: null }

  componentDidMount(){
    let data;
    axios.get("http://127.0.0.1:8000/user/me/") //-------------------
    .then(responce => {
      data = responce.data;
      this.setState({
        details: data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  render(){
    const { details } = this.state;
    return(
    <div className={editProfileStyles.mainDivEditProfilePage}>
      <Header typeOfScreen={"settings"} />

      <div className={editProfileStyles.contentDivEditProfilePage}>
        {details && (
            <div className={editProfileStyles.leftSide}>
              <div className={editProfileStyles.avatar}></div>

              <button type="button" className={editProfileStyles.editProfilePhoto}>Редагувати фото профіля</button>

              <h1>Редагування профіля</h1>

              <div className={editProfileStyles.profileInfo}>
                <div className={editProfileStyles.textInfoDiv}>
                  {/* Обращаемся напрямую к details без всяких .map() */}
                  <h3 className={editProfileStyles.textInfo}>Им’я: {details.first_name}</h3>
                  <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
                </div>
                <div className={editProfileStyles.textInfoDiv}>
                  <h3 className={editProfileStyles.textInfo}>Призвище: {details.last_name}</h3>
                  <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
                </div>
                <div className={editProfileStyles.textInfoDiv}>
                  <h3 className={editProfileStyles.textInfo}>Дата народження: {details.birthday}</h3>
                  <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
                </div>
                <div className={editProfileStyles.textInfoDiv}>
                  <h3 className={editProfileStyles.textInfo}>Місто: {details.nationality}</h3>
                  <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
                </div>
                <div className={editProfileStyles.textInfoDiv}>
                  <h3 className={editProfileStyles.textInfo}>Освіта: Немає</h3>
                  <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
                </div>
                <div className={editProfileStyles.textInfoDiv}>
                  <h3 className={editProfileStyles.textInfo}>Пошта: {details.email}</h3>
                  <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
                </div>

                <div className={editProfileStyles.buttonDiv}>
                  <button type="button" className={editProfileStyles.textFactoryButton}>Зберегти зміни</button>
                </div>
              </div>
            </div>
          )}
        
        <div className={editProfileStyles.rightSide}>
          <h1>Редагування резюме</h1>
          <h2>Зараз в вас немає резюме</h2>

          <div className={editProfileStyles.buttonDiv}>
            <button type="button" className={editProfileStyles.resumeFactoryButton}>Створити резюме</button>
          </div>
        </div>
      </div>

    </div>


  )}
}

export default EditProfilePage