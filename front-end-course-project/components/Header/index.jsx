import headerStyles from "./Header.module.css"

function Header() {
    return(
        <div id={headerStyles.header}>
            <div className={headerStyles.avatarDiv}></div>

            <div className={headerStyles.mainButton}>
              <button type="button">Головна</button>
              <button type="button">Профіль</button>
              <button type="button">Налаштування</button>
            </div>

            <button type="button" id={headerStyles.exitButton}></button>
        </div>
    )
    
}

export default Header