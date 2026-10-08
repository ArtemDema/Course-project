import companyStyles from "./CompanyPage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class CompanyPage extends React.Component{
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
    <div className={companyStyles.mainDivCompanyPage}>
      <Header/>

      <div className={companyStyles.contentDivCompanyPage}>

        {this.state.details.map((output, id) => (
          <div className={companyStyles.leftSide} key={id}>
            <div className={companyStyles.backCompanyDiv}></div>
            <h2>Фото підприємства</h2>
            <div className={companyStyles.exampleCompanyAvatarDiv}></div>
            <h2>{output.name}</h2>
            <h3>Інформація про підприємство:</h3>
            <h4>{output.description}</h4>
            <h3>Підприємство засновано у: {output.date_of_creation} рік</h3>
            <h3>Контактний номер підприємства:</h3>
            <div>
              <h4>Им’я призвище - {output.contact_email}</h4>
            </div>
          </div>
        ))}
        
        {this.state.details.map((output, id) => (
          <div className={companyStyles.rightSide}>
            <h3>Робочий графік: з 9 до 17</h3>
            <h3>Фотографії від компанії</h3>
            <div className={companyStyles.PhotoDiv}>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
              <div className={companyStyles.examplePhotoFromCompanyDiv}></div>
            </div>

            <h2>Штаб</h2>
            <div className={companyStyles.workersDiv}>
              <h4>Им’я призвище - посада</h4>
              <h4>Им’я призвище - посада</h4>
              <h4>Им’я призвище - посада</h4>
              <h4>Им’я призвище - посада</h4>
              <h4>Им’я призвище - посада</h4>
              <h4>Им’я призвище - посада</h4>
              <h4>Им’я призвище - посада</h4>
            </div>

            <h3 className={companyStyles.ProductText}>Продукція яку надає компанія та деталі про неї:</h3>
            <h4>Назва продукції: {output.product}</h4>
            <h4>Обсяг продукції, що виготовляється(якщо можливо порахувати): {output.volume_of_prodiction}</h4>
            <h4>Опис продукції: {output.description_of_product}</h4>
          </div>
          ))}
        

      </div>
    </div>
  )}
}

export default CompanyPage