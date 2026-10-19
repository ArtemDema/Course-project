import profileStyles from "./ProfilePage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class ProfilePage extends React.Component{
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
    <div className={profileStyles.mainDivProfilePage}>
      <Header typeOfScreen={"profile"} />

      
        {this.state.details.map((output, id) => (
          <div className={profileStyles.contentDivProfilePage}>
          <div className={profileStyles.leftSide} key={id}>
            <div className={profileStyles.avatar}></div>
              <h1>{output.first_name} {output.last_name}</h1>

              <div className={profileStyles.profileInfo}>
                <h3 className={profileStyles.textInfo}>Вік: 666</h3>
                <h3 className={profileStyles.textInfo}>Місто: {output.city}</h3>
                <h3 className={profileStyles.textInfo}>Освіта: {output.education}</h3>
                <h3 className={profileStyles.textInfo}>Пошта: {output.email}</h3>
                <h3 className={profileStyles.textInfo}>Навички: Не вказано</h3>
            </div>
          </div>

          <div className={profileStyles.rightSide}>
            <h1>Про мене</h1>

            <h4>{output.about_me}</h4>
          </div>
        </div>
        ))}
    </div>

  )}
}

export default ProfilePage