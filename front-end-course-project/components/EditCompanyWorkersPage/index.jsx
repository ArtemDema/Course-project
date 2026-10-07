import editCompanyWorkersStyles from "./EditCompanyWorkersPage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class EditCompanyWorkersPage extends React.Component{
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
    <div className={editCompanyWorkersStyles.mainEditCompanyPage}>
      <Header/>

      <div className={editCompanyWorkersStyles.contentEditCompany}>
        <div className={editCompanyWorkersStyles.leftSide}>
          <div className={editCompanyWorkersStyles.avatar}></div>
          <h1>FreshCode</h1>

          <button type="button" className={editCompanyWorkersStyles.editCompanyPhoto}>Редагувати фото компанії</button>

        </div>
        <div className={editCompanyWorkersStyles.rightSide}>
          <h1>Редагування компанії</h1>

          <h3>Штаб працівників:</h3>

          <div className={editCompanyWorkersStyles.companyInfo}>
            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyWorkersStyles.textInfoDiv}>
              <h3 className={editCompanyWorkersStyles.textInfo}>Им’я призвище - посада</h3>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Звільнити</button>
              <button type="button" className={editCompanyWorkersStyles.editInfoButton}>Редагувати</button>
            </div>
          </div>

          <button type="button" className={editCompanyWorkersStyles.editInfoWorkersButton}>Додати працівника</button>

          <div className={editCompanyWorkersStyles.buttonDiv}>
            <button type="button" className={editCompanyWorkersStyles.textFactoryButton}>Зберегти</button>
          </div>
        </div>
      </div>

    </div>


  )}
}

export default EditCompanyWorkersPage