import profileStyles from "./ProfilePage.module.css"
import Header from "../Header"

function ProfilePage() {
  return(
    <div className={profileStyles.mainDivProfilePage}>
      <Header/>

      <div className={profileStyles.contentDivProfilePage}>
        <div className={profileStyles.leftSide}>
          <div className={profileStyles.backDiv}>
            <div className={profileStyles.backImageDiv}></div>
            <h4>Повернутися до останньої сторінки</h4>
          </div>
          <div className={profileStyles.avatar}></div>
          <h1>Ім’ев Призвищевич</h1>

          <div className={profileStyles.profileInfo}>
            <h3 className={profileStyles.textInfo}>Вік: 666</h3>
            <h3 className={profileStyles.textInfo}>Національність: Марсіанін</h3>
            <h3 className={profileStyles.textInfo}>Освіта: Немає</h3>
            <h3 className={profileStyles.textInfo}>Пошта: markabobus@gmail.com</h3>
            <h3 className={profileStyles.textInfo}>Поточне місце роботи: ФОП "Призвищевич А.А.”</h3>
          </div>

        </div>
        <div className={profileStyles.rightSide}>
          <h1>Історія місць роботи</h1>

          <div className={profileStyles.exampleFactory}>
            <div className={profileStyles.exampleFactoryPhoto}></div>

            <div className={profileStyles.infoFactoryTextDiv}>
              <div className={profileStyles.textFactoryName}>Назва підприемства: FreshCode</div>
              <div className={profileStyles.textFactory}>Період роботи: в стані роботи</div>
              <div className={profileStyles.textFactory}>Займана посада: Back-end розробник</div>
            </div>

            <div className={profileStyles.buttonDiv}>
              <button type="button" className={profileStyles.textFactoryButton}>Показати більше</button>
            </div>
          </div>

          <div className={profileStyles.exampleFactory}>
            <div className={profileStyles.exampleFactoryPhoto}></div>

            <div className={profileStyles.infoFactoryTextDiv}>
              <div className={profileStyles.textFactoryName}>Назва підприемства: FreshCode</div>
              <div className={profileStyles.textFactory}>Період роботи: 0.00.0000 - 0.00.0000</div>
              <div className={profileStyles.textFactory}>Займана посада: Back-end розробник</div>
            </div>


            <div className={profileStyles.buttonDiv}>
              <button type="button" className={profileStyles.textFactoryButton}>Показати більше</button>
            </div>
          </div>

          <div className={profileStyles.exampleFactory}>
            <div className={profileStyles.exampleFactoryPhoto}></div>

            <div className={profileStyles.infoFactoryTextDiv}>
              <div className={profileStyles.textFactoryName}>Назва підприемства: FreshCode</div>
              <div className={profileStyles.textFactory}>Період роботи: 0.00.0000 - 0.00.0000</div>
              <div className={profileStyles.textFactory}>Займана посада: Back-end розробник</div>
            </div>


            <div className={profileStyles.buttonDiv}>
              <button type="button" className={profileStyles.textFactoryButton}>Показати більше</button>
            </div>
          </div>

          <div className={profileStyles.exampleFactory}>
            <div className={profileStyles.exampleFactoryPhoto}></div>

            <div className={profileStyles.infoFactoryTextDiv}>
              <div className={profileStyles.textFactoryName}>Назва підприемства: FreshCode</div>
              <div className={profileStyles.textFactory}>Період роботи: 0.00.0000 - 0.00.0000</div>
              <div className={profileStyles.textFactory}>Займана посада: Back-end розробник</div>
            </div>


            <div className={profileStyles.buttonDiv}>
              <button type="button" className={profileStyles.textFactoryButton}>Показати більше</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default ProfilePage