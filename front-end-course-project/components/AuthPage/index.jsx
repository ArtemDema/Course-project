import authStyles from "./AuthPage.module.css"
import { useState } from 'react';

function AuthPage() {
  // 'login', 'register-1', 'register-2', 'confirm'
  const [currentScreen, setCurrentScreen] = useState('login');

  return (
    <div className={authStyles.mainDiv}>
      <header id={authStyles.header}>
        <h1>Ласкаво просимо на сайт!</h1>
      </header>

      <div className={authStyles.contentDiv}>

        {/* 1. Авторизация */}
        {currentScreen === 'login' && (
          <div className={authStyles.authDiv}>
            <div className={authStyles.authFormDiv}>
              <div className={authStyles.authTextDiv}>
                <h1>Авторизація</h1>
                <h2>Увійдіть у свій аккаунт</h2>
              </div>

              <div className={authStyles.authFormInputDiv}>
                <h3>Ваша пошта</h3>
                <input type="text" />
                <h3>Ваш пароль</h3>
                <input type="text" />
              </div>

              <div className={authStyles.authFormConfirmDiv}>
                <h2>У Вас немає аккаунта?</h2>
                <button type="button" className={authStyles.backButton} onClick={() => setCurrentScreen('register-1')}>
                  перейти до реєстрації
                </button>
                <button type="button" onClick={() => setCurrentScreen('register-1')}>
                  Підтвердити</button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Регистрация Часть 1 */}
        {currentScreen === 'register-1' && (
          <div className={authStyles.authDiv}>
            <div className={authStyles.authFormDiv}>
              <div className={authStyles.authTextDiv}>
                <h1>Реєстрація</h1>
                <h2>Вкажіть деяку інформацію про себе</h2>
              </div>

              <div className={authStyles.registerFormInputDiv}>
                <h3>Ваша пошта</h3>
                <input type="text" />
                <h3>Ваш пароль</h3>
                <input type="text" />
                <h3>Повторіть пароль</h3>
                <input type="text" />
              </div>

              <div className={authStyles.authFormConfirmDiv}>
                <h2>Вже є аккаунт?</h2>
                <button type="button" className={authStyles.backButton} onClick={() => setCurrentScreen('login')}>
                  перейти до авторизації
                </button>
                <button onClick={() => setCurrentScreen('register-2')}>Підтвердити</button>
              </div>
            </div>
          </div>
        )}

        {/* 3. Регистрация Часть 2 */}
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
          <div className={authStyles.confrimDiv}>
            <div className={authStyles.authFormDiv}>
              <div className={authStyles.authTextDiv}>
                <h1>Підтвердіть свою пошту</h1>
                <h2>Код відправлено вам на вказану пошту</h2>
              </div>

              <div className={authStyles.confrimFormInputDiv}>
                <input type="text" /><input type="text" /><input type="text" /><input type="text" />
                <input type="text" /><input type="text" /><input type="text" /><input type="text" />
              </div>

              <div className={authStyles.authFormConfirmDiv}>
                <h2>Помилились або бажаєте щось змінити?</h2>
                <button type="button" className={authStyles.backButton} onClick={() => setCurrentScreen('register-2')}>
                  повернутися до реєстрації
                </button>
                <button>Підтвердити</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AuthPage