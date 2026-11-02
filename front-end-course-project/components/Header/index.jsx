import headerStyles from "./Header.module.css"
import React, { useState, useEffect } from "react";
import api from '../Api';

function Header({typeOfScreen}) {

  const [user, setCompany] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token){
      Promise.all([
        api.get(`user/me/`),
      ])
      .then((userResponce) => {
        setCompany(userResponce[0].data);
        
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      })
    }
  }, []);

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
        <div className={headerStyles.avatarDiv}>
          {user ? (<img 
            src={user.avatar} 
            className={headerStyles.avatarUser}  
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: "1234px" }} 
          />
          ) : (<></>)}
        </div>

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