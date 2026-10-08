import editProfileStyles from "./EditProfilePage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class EditProfilePage extends React.Component{
  state = {details: [], }

  componentDidMount(){
    let data;
    axios.get("http://127.0.0.1:8000/user/") //-------------------
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
    return(
    <div className={editProfileStyles.mainDivEditProfilePage}>
      <Header/>

      <div className={editProfileStyles.contentDivEditProfilePage}>
        {this.state.details.map((output, id) => (
          <div className={editProfileStyles.leftSide}>
            <div className={editProfileStyles.avatar}></div>
            <h1>{output.first_name} {output.last_name}</h1>

            <button type="button" className={editProfileStyles.editProfilePhoto}>Редагувати фото профіля</button>

          </div>
        ))}

        {this.state.details.map((output, id) => (
          <div className={editProfileStyles.rightSide}>
            <h1>Редагування профіля</h1>

            <div className={editProfileStyles.profileInfo}>
              <div className={editProfileStyles.textInfoDiv}>
                <h3 className={editProfileStyles.textInfo}>Им’я: {output.first_name}</h3>
                <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
              </div>
              <div className={editProfileStyles.textInfoDiv}>
                <h3 className={editProfileStyles.textInfo}>Призвище: {output.last_name}</h3>
                <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
              </div>
              <div className={editProfileStyles.textInfoDiv}>
                <h3 className={editProfileStyles.textInfo}>Дата народження: {output.birthday}</h3>
                <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
              </div>
              <div className={editProfileStyles.textInfoDiv}>
                <h3 className={editProfileStyles.textInfo}>Національність: {output.nationality}</h3>
                <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
              </div>
              <div className={editProfileStyles.textInfoDiv}>
                <h3 className={editProfileStyles.textInfo}>Освіта: Немає</h3>
                <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
              </div>
              <div className={editProfileStyles.textInfoDiv}>
                <h3 className={editProfileStyles.textInfo}>Пошта: {output.email}</h3>
                <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
              </div>
            </div>

            <div className={editProfileStyles.buttonDiv}>
              <button type="button" className={editProfileStyles.textFactoryButton}>Зберегти зміни</button>
            </div>
          </div>
        ))}
        
      </div>

    </div>


  )}
}

export default EditProfilePage