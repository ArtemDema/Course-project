import editCompanyStyles from "./EditCompanyPage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class EditCompanyPage extends React.Component{
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
    <div className={editCompanyStyles.mainEditCompanyPage}>
      <Header/>

      <div className={editCompanyStyles.contentEditCompany}>
        <div className={editCompanyStyles.leftSide}>
          <div className={editCompanyStyles.avatar}></div>
          <h1>FreshCode</h1>

          <button type="button" className={editCompanyStyles.editCompanyPhoto}>Редагувати фото компанії</button>

        </div>
        <div className={editCompanyStyles.rightSide}>
          <h1>Редагування компанії</h1>

          <div className={editCompanyStyles.companyInfo}>
            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Назва компанії: FreshCode</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Дата заснування: 2017</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Інформація про підприємство</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Фотографії від власника</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Штаб працівників</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Пошта представника компанії</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Графік роботи: 9-17</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Назва продукції: Інформація</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Обсяг продукції: не надано</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>

            <div className={editCompanyStyles.textInfoDiv}>
              <h3 className={editCompanyStyles.textInfo}>Інформація про продукцію</h3>
              <button type="button" className={editCompanyStyles.editInfoButton}>Редагувати</button>
            </div>
          </div>

          <div className={editCompanyStyles.buttonDiv}>
            <button type="button" className={editCompanyStyles.textFactoryButton}>Зберегти зміни</button>
          </div>
        </div>
      </div>

    </div>


  )}
}

export default EditCompanyPage