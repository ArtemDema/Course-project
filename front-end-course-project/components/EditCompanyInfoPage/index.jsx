import editCompanyInfoStyles from "./EditCompanyInfoPage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class EditCompanyInfoPage extends React.Component{
  state = {details: [], }

  componentDidMount(){
    let data;
    axios.get("http://127.0.0.1:8000/company/") //-------------------
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
    <div className={editCompanyInfoStyles.mainEditCompanyInfoPage}>
      <Header/>

      <div className={editCompanyInfoStyles.contentEditCompanyInfo}>
        <div className={editCompanyInfoStyles.leftSide}>
          <div className={editCompanyInfoStyles.avatar}></div>
          <h1>FreshCode</h1>

          <button type="button" className={editCompanyInfoStyles.editCompanyInfoPhoto}>Редагувати фото компанії</button>

        </div>
        <div className={editCompanyInfoStyles.rightSide}>
          <h1>Редагування компанії</h1>

          <div className={editCompanyInfoStyles.companyInfo}>
            <h3 className={editCompanyInfoStyles.descriptionCompany}>Інформація про підприємство:</h3>
            <h4 className={editCompanyInfoStyles.descriptionCompanyText}>"Навчальний центр Freshcode — IT-освіта від IT-компаній!  Навчальний центр Freshcode проводить курси за найзатребуванішими для  IT-ринку напрямами: JavaScript-розробка та проєктний менеджмент. Ми надаємо кожному студенту практичні навички програмування та  менеджменту, що засновані на реальних, архівних проєктах, відпрацьованих в IT-компаніях.</h4>

            <h3 className={editCompanyInfoStyles.descriptionCompany}>Максимум 650 символів</h3>
            <div className={editCompanyInfoStyles.buttonDiv}>
              <button type="button" className={editCompanyInfoStyles.textFactoryButton}>Зберегти</button>
              <div/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
}

export default EditCompanyInfoPage