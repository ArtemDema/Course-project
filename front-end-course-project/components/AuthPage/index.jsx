import authStyles from "./AuthPage.module.css"
import { useState } from 'react';
import AuthForm from "./FormikAuth";
import RegisterForm from "./FormikRegistration";
import ConfirmForm from "./FormikComfirm";

function AuthPage() {
  // 'login', 'register-1', 'register-2', 'confirm'
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <div className={authStyles.mainDiv}>
      <header id={authStyles.header}>
        <h1>Ласкаво просимо на сайт!</h1>
      </header>

      <div className={authStyles.contentDiv}>

        {/* Авторизация */}
        {currentScreen === 'login' && (
          <AuthForm setScreen={setCurrentScreen}/>
        )}

        {/* Регистрация */}
        {currentScreen === 'register-1' && (
          <RegisterForm setScreen={setCurrentScreen}/>
        )}

        {/* Регистрация 2 */}
        {currentScreen === 'register-2' && (
          <div className={authStyles.authDiv}>
            <div className={authStyles.authFormDiv}>
              <div className={authStyles.authTextDiv}>
                <h1>Реєстрація</h1>
                <h2>Введіть інформацію про себе</h2>
              </div>

              <div className={authStyles.registerFormInputTwoDiv}>
                <h3>Ваше ім’я</h3>
                <input type="text" />
                <h3>Ваше прізвище</h3>
                <input type="text" />
                <h3>Ким ви є?</h3>
                <div>
                  <button type="button" id={authStyles.worker}>Я працівник</button>
                  <button type="button" id={authStyles.owner}>Я власник</button>
                </div>
              </div>

              <div className={authStyles.authFormConfirmDiv}>
                <button type="button" className={authStyles.backButton} onClick={() => setCurrentScreen('register-1')}>
                  повернутися до попередньої форми
                </button>
                <button onClick={() => setCurrentScreen('confirm')}>Підтвердити</button>
              </div>
            </div>
          </div>
        )}

        {/* Подтверждение почты */}
        {currentScreen === 'confirm' && (
          <ConfirmForm setScreen={setCurrentScreen}/>
        )}

      </div>
    </div>
  );
}

export default AuthPage