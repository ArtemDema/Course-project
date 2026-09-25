import editProfileStyles from "./EditProfilePage.module.css"
import Header from "../Header"

function EditProfilePage() {
  return(
    <div className={editProfileStyles.mainDivEditProfilePage}>
      <Header/>

      <div className={editProfileStyles.contentDivEditProfilePage}>
        <div className={editProfileStyles.leftSide}>
          <div className={editProfileStyles.avatar}></div>
          <h1>Ім’ев Призвищевич</h1>

          <button type="button" className={editProfileStyles.editProfilePhoto}>Редагувати фото профіля</button>

        </div>
        <div className={editProfileStyles.rightSide}>
          <h1>Редагування профіля</h1>

          <div className={editProfileStyles.profileInfo}>
            <div className={editProfileStyles.textInfoDiv}>
              <h3 className={editProfileStyles.textInfo}>Им’я: Ім’ев</h3>
              <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
            </div>
            <div className={editProfileStyles.textInfoDiv}>
              <h3 className={editProfileStyles.textInfo}>Призвище: Призвищевич</h3>
              <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
            </div>
            <div className={editProfileStyles.textInfoDiv}>
              <h3 className={editProfileStyles.textInfo}>Дата народження: 00.00.0000</h3>
              <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
            </div>
            <div className={editProfileStyles.textInfoDiv}>
              <h3 className={editProfileStyles.textInfo}>Національність: Марсіанін</h3>
              <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
            </div>
            <div className={editProfileStyles.textInfoDiv}>
              <h3 className={editProfileStyles.textInfo}>Освіта: Немає</h3>
              <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
            </div>
            <div className={editProfileStyles.textInfoDiv}>
              <h3 className={editProfileStyles.textInfo}>Пошта: markabobus@gmail.com</h3>
              <button type="button" className={editProfileStyles.editInfoButton}>Редагувати</button>
            </div>
          </div>

          <div className={editProfileStyles.buttonDiv}>
            <button type="button" className={editProfileStyles.textFactoryButton}>Зберегти зміни</button>
          </div>
        </div>
      </div>

    </div>


  )
}

export default EditProfilePage