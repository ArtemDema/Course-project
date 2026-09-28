import editCompanyStyles from "./EditCompanyPage.module.css"
import Header from "../Header"

function EditCompanyPage() {
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


  )
}

export default EditCompanyPage