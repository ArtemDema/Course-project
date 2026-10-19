import headerStyles from "./Header.module.css"

function Header({typeOfScreen}) {

  const redirectMain = () => {
    window.location.href = 'http://localhost:5173/';
  }
  const redirectProfile = () => {
    window.location.href = 'http://localhost:5173/profile';
  }
  const redirectSettings = () => {
    window.location.href = 'http://localhost:5173/editProfile';
  }

  return(
      <div id={headerStyles.header}>
        <div className={headerStyles.avatarDiv}></div>

        <div className={headerStyles.mainButton}>
            {typeOfScreen === 'main' && (
              <>
                <button onClick={redirectMain} type="button" className={headerStyles.select}>Головна</button>
                <button onClick={redirectProfile} type="button" className={headerStyles.notSelect}>Профіль</button>
                <button onClick={redirectSettings} type="button" className={headerStyles.notSelect}>Налаштування</button>
              </>
            )}

            {typeOfScreen === 'profile' && (
              <>
                <button onClick={redirectMain} type="button" className={headerStyles.notSelect}>Головна</button>
                <button onClick={redirectProfile} type="button" className={headerStyles.select}>Профіль</button>
                <button onClick={redirectSettings} type="button" className={headerStyles.notSelect}>Налаштування</button>
              </>
            )}

            {typeOfScreen === 'settings' && (
              <>
                <button onClick={redirectMain} type="button" className={headerStyles.notSelect}>Головна</button>
                <button onClick={redirectProfile} type="button" className={headerStyles.notSelect}>Профіль</button>
                <button onClick={redirectSettings} type="button" className={headerStyles.select}>Налаштування</button>
              </>
            )}
          
        </div>

        <button type="button" id={headerStyles.exitButton}></button>
      </div>
  )
    
}

export default Header