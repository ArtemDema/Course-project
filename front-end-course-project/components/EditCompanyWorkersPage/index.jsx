import editCompanyWorkersStyles from "./EditCompanyWorkersPage.module.css"
import Header from "../Header"

function EditCompanyWorkersPage() {
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


  )
}

export default EditCompanyWorkersPage