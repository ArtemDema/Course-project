import editCompanyPhotoStyles from "./EditCompanyPhotosPage.module.css"
import Header from "../Header"
import React from 'react'
import axios from 'axios'

class EditCompanyPhotosPage extends React.Component{
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
    <div className={editCompanyPhotoStyles.mainEditCompanyPhotosPage}>
      <Header/>

      <div className={editCompanyPhotoStyles.contentEditCompanyPhotos}>
        <div className={editCompanyPhotoStyles.leftSide}>
          <div className={editCompanyPhotoStyles.avatar}></div>
          <h1>FreshCode</h1>

          <button type="button" className={editCompanyPhotoStyles.editCompanyPhoto}>Редагувати фото компанії</button>

        </div>
        <div className={editCompanyPhotoStyles.rightSide}>
          <h1>Редагування компанії</h1>
          <h3>Фотографії від підприємства:</h3>

          <div className={editCompanyPhotoStyles.companyInfo}>
            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.photoExample}>
              <button type="button" className={editCompanyPhotoStyles.deleteButton}></button>
            </div>

            <div className={editCompanyPhotoStyles.buttonDiv}>
              <button type="button" className={editCompanyPhotoStyles.textFactoryButtonAdd}>Додати фотографії</button>
              <h3>Максимум 10 фотографій</h3>
              <button type="button" className={editCompanyPhotoStyles.textFactoryButton}>Зберегти</button>
              <div/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
}

export default EditCompanyPhotosPage