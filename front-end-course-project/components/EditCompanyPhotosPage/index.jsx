import editCompanyPhotoStyles from "./EditCompanyPhotosPage.module.css"
import Header from "../Header"

function EditCompanyPhotosPage() {
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
  )
}

export default EditCompanyPhotosPage