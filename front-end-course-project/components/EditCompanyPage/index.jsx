import editCompanyStyles from "./EditCompanyPage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class EditCompanyPage extends React.Component{
  state = { 
    company: null
  }

  componentDidMount(){
    axios.get("http://127.0.0.1:8000/company/0/") //-------------------
    .then(responce => {
      this.setState({
        company: responce.data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  render(){
    const { company } = this.state

    return(
    <div className={editCompanyStyles.mainEditCompanyPage}>
      <Header typeOfScreen={"settings"}/>

      <div className={editCompanyStyles.contentEditCompany}>
        {company ? (
          <>
          <div className={editCompanyStyles.leftSide}>
            <div className={editCompanyStyles.avatar}></div>
            <h1>{company.name}</h1>

            <button type="button" className={editCompanyStyles.editCompanyPhoto}>Редагувати фото компанії</button>

          </div>
          <div className={editCompanyStyles.rightSide}>
            <h1>Редагування компанії</h1>

            <div className={editCompanyStyles.companyInfo}>
              <div className={editCompanyStyles.textInfoDiv}>
                <h3 className={editCompanyStyles.textInfo}>Назва компанії: {company.name}</h3>
                <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
              </div>

              <div className={editCompanyStyles.textInfoDiv}>
                <h3 className={editCompanyStyles.textInfo}>Інформація про підприємство</h3>
                <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
              </div>

              <div className={editCompanyStyles.textInfoDiv}>
                <h3 className={editCompanyStyles.textInfo}>Пошта представника компанії</h3>
                <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
              </div>
            </div>

            <div className={editCompanyStyles.buttonDiv}>
              <button type="button" className={editCompanyStyles.textFactoryButton}>Зберегти зміни</button>
            </div>
          </div>
          </>) : (<></>)}
        
        
      </div>

    </div>


  )}
}

export default EditCompanyPage