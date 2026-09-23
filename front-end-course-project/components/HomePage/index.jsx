import homeStyles from "./HomePage.module.css"
import Header from "../Header"

function HomePage() {
  return(
    <div className={homeStyles.mainDivHomePage}>
      <Header/>

      <div className={homeStyles.contentDivHomePage}>
        <div className={homeStyles.leftSide}>
          <div className={homeStyles.avatar}></div>
          <h1>Ім’ев Призвищевич</h1>

          <div className={homeStyles.profileInfo}>
            <h3 className={homeStyles.textInfo}>Вік: 666</h3>
            <h3 className={homeStyles.textInfo}>Національність: Марсіанін</h3>
            <h3 className={homeStyles.textInfo}>Освіта: Немає</h3>
            <h3 className={homeStyles.textInfo}>Пошта: markabobus@gmail.com</h3>
            <h3 className={homeStyles.textInfo}>Поточне місце роботи: ФОП "Призвищевич А.А.”</h3>
          </div>

          <button className={homeStyles.toProfileButton}>До профіля</button>

        </div>
        <div className={homeStyles.rightSide}>
          <div className={homeStyles.searchDiv}></div>

          <div className={homeStyles.exampleFactory}>
            <div className={homeStyles.exampleFactoryPhoto}></div>

            <div className={homeStyles.textFactoryName}>SchoolFactory</div>
            <div className={homeStyles.textFactory}>График роботи: 9-17</div>
            <div className={homeStyles.textFactory}>Штаб: n осіб</div>

            <button type="button" className={homeStyles.textFactoryButton}>Показати більше</button>
          </div>

          <div className={homeStyles.exampleFactory}>
            <div className={homeStyles.exampleFactoryPhoto}></div>
            
            <div className={homeStyles.textFactoryName}>SchoolFactory</div>
            <div className={homeStyles.textFactory}>График роботи: 9-17</div>
            <div className={homeStyles.textFactory}>Штаб: n осіб</div>

            <button type="button" className={homeStyles.textFactoryButton}>Показати більше</button>
          </div>

          <div className={homeStyles.exampleFactory}>
            <div className={homeStyles.exampleFactoryPhoto}></div>
            
            <div className={homeStyles.textFactoryName}>SchoolFactory</div>
            <div className={homeStyles.textFactory}>График роботи: 9-17</div>
            <div className={homeStyles.textFactory}>Штаб: n осіб</div>

            <button type="button" className={homeStyles.textFactoryButton}>Показати більше</button>
          </div>

          <div className={homeStyles.exampleFactory}>
            <div className={homeStyles.exampleFactoryPhoto}></div>
            
            <div className={homeStyles.textFactoryName}>SchoolFactory</div>
            <div className={homeStyles.textFactory}>График роботи: 9-17</div>
            <div className={homeStyles.textFactory}>Штаб: n осіб</div>

            <button type="button" className={homeStyles.textFactoryButton}>Показати більше</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage